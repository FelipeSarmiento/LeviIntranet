import {printPdfBytes} from "@/lib/hooks/etiquetas/etiquetasHooks";
import {EmpleadoInterface} from "@/lib/interfaces/_interfaces";

import {PDFDocument, PDFFont, PDFPage, rgb, StandardFonts} from "pdf-lib";

export async function generateCertificado(tipoCertificado: string, data: EmpleadoInterface, destinatario?: string, funciones?: string, historialContatos?: EmpleadoInterface[]) {

    // === Función para envolver texto ===
    function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number) {
        const paragraphs = text.split("\n"); // respetar párrafos
        const lines: string[] = [];

        for (const paragraph of paragraphs) {
            const words = paragraph.split(" ");
            let currentLine = "";

            for (const word of words) {
                const testLine = currentLine ? currentLine + " " + word : word;
                const width = font.widthOfTextAtSize(testLine, fontSize);

                if (width > maxWidth && currentLine !== "") {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            }
            if (currentLine) lines.push(currentLine);

            // línea en blanco al final de cada párrafo
            lines.push("");
        }
        return lines;
    }

    // === Función para dibujar texto justificado ===
    function drawJustifiedText(
        page: PDFPage,
        line: string,
        x: number,
        y: number,
        font: PDFFont,
        fontSize: number,
        maxWidth: number,
        isLastLine: boolean
    ) {
        const words = line.trim().split(/\s+/);

        // Última línea o muy pocas palabras → alineado normal
        if (words.length <= 2 || isLastLine) {
            page.drawText(line, {x, y, size: fontSize, font});
            return;
        }

        const textWithoutSpaces = words.join("");
        const textWidth = font.widthOfTextAtSize(textWithoutSpaces, fontSize);

        // Si la línea es demasiado corta (menos del 70% del ancho), no justificar
        if (textWidth < maxWidth * 0.7) {
            page.drawText(line, {x, y, size: fontSize, font});
            return;
        }

        // Calcular espacio extra entre palabras
        const totalWords = words.length;
        const spaceAvailable = maxWidth - textWidth;
        const spacePerGap = spaceAvailable / (totalWords - 1);

        let cursorX = x;
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            page.drawText(word, {x: cursorX, y, size: fontSize, font});
            cursorX += font.widthOfTextAtSize(word, fontSize) + spacePerGap;
        }
    }

    // === Fecha ===
    const fechaExpedicion = new Date().toLocaleDateString("es-CO", {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    // === Datos empresa ===
    const empresa = "LEVI STRAUSS COLOMBIA SAS";
    const nit = "901.778.500";

    const pdfDoc = await PDFDocument.create();
    const imageUrl = "/images/Levis-LogoEscalaGrises.png";
    const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(imageBytes);

    let page: PDFPage;
    const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    let y: number;

    const addPagePDF = () => {
        page = pdfDoc.addPage([612, 792]); // tamaño carta
        const {height, width} = page.getSize();
        const marginX = 40;
        const maxWidth = width - marginX * 2;

        y = height - 40;

        // === ENCABEZADO ===
        page.drawImage(pngImage, {
            x: marginX,
            y: y - 60,
            width: 100,
            height: 50,
        });
        y -= 20;
        page.drawText("LEVI STRAUSS COLOMBIA SAS", {
            x: 150,
            y: y - 10,
            size: 15,
            font: fontBold,
        });
        page.drawText("Generado el\n" + fechaExpedicion, {
            x: 430,
            y: y - 10,
            size: 12,
            font: fontNormal,
            lineHeight: 14
        });

        y -= 25;
        page.drawText("CALLE 72 #44 - 185 - ITAGÜI-COLOMBIA", {
            x: 150,
            y,
            size: 10,
            font: fontBold,
        });

        page.drawText("NIT:", {x: 150, y: y - 15, size: 10, font: fontBold});
        page.drawText("901.778.500", {
            x: 175,
            y: y - 15,
            size: 10,
            font: fontNormal,
        });

        page.drawLine({
            start: {x: marginX, y: y - 25},
            end: {x: 550, y: y - 25},
            thickness: 1,
            color: rgb(0, 0, 0),
        });

        y -= 100;
        let titulo = "";
        switch (tipoCertificado) {
            case 'activo':
                titulo = "CERTIFICADO LABORAL"
                break;
            case 'retirado':
                titulo = "CERTIFICADO LABORAL - RETIRADO"
                break;
            case 'vencimiento':
                titulo = "VENCIMIENTO DE CONTRATO LABORAL"
                break;
                break;
        }

        const coorTitle = fontBold.widthOfTextAtSize(titulo, 13)
        const coorX = (width / 2) - (coorTitle / 2)

        // === TÍTULO ===
        page.drawText(titulo, {
            x: coorX,
            y,
            size: 13,
            font: fontBold,
        });
        y -= 50;

        // === TEXTO PRINCIPAL ===
        const tipoContrato = data?.tipoContrato == "indef" ? "Indefinido" : "Fijo";
        const valorSalario = data?.valorSalario
        const cedula = new Intl.NumberFormat("es-CO", {
            style: "decimal",
            minimumFractionDigits: 0,
        }).format(Number(data?.cedula))

        const textDestinatario = destinatario ? 'Cordial saludo ' + destinatario + ".\n" : ""
        const nombreCompleto = `${data?.primerNombre} ${data?.segundoNombre} ${data?.primerApellido} ${data?.segundoApellido}`
        const fechaContrato = new Date(data?.fechaContrato ?? '').toLocaleDateString("es-CO", {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        const fechaRetiro = new Date(data?.fechaRetiro || '').toLocaleDateString("es-CO", {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })

        const historialContratos = historialContatos?.map((historialContato, index: number) => {
            const fechaInicioHistorial = new Date(historialContato?.fechaContrato ?? '').toLocaleDateString("es-CO", {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            const fechaFinHistorial = new Date(historialContato?.fechaRetiro || '').toLocaleDateString("es-CO", {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            return `- Contrato N° ${index + 1}: Desde ${fechaInicioHistorial} hasta el ${fechaFinHistorial} , desempeñando el cargo de ${historialContato.cargo}.`
        })

        const textoActivo = `${textDestinatario}La empresa ${empresa} con NIT ${nit} certifica que:
${nombreCompleto}, identificado(a) con cédula de ciudadanía No. ${cedula}, labora en nuestra empresa desde el ${fechaContrato}, desempeñando el cargo de ${data?.cargo}.
Su contrato es de tipo ${tipoContrato}, con salario de $ ${valorSalario} (${data?.valorSalarioLetras}).
Esta certificación se expide a solicitud del interesado para los fines que estime convenientes.

Cordialmente.

Area de Gestión Humana.`;
        const textoRetirado = `${textDestinatario}La empresa ${empresa} con NIT ${nit} certifica que:
${nombreCompleto}, identificado(a) con cédula de ciudadanía No. ${cedula}, laboró en nuestra empresa desde el ${fechaContrato} hasta el ${fechaRetiro}, desempeñando el cargo de ${data?.cargo}.
${funciones ? `Funciones: ${funciones}.` : ''}
${historialContratos ? `Historial Contratos:\n${historialContratos?.join("\n")}` : ''}
Esta certificación se expide a solicitud del interesado para los fines que estime convenientes.

Cordialmente,

Area de Gestión Humana.`;
        const today = new Date();
        const month = ((today.getMonth() + 2) % 12 == 0) ? 12 : today.getMonth() + 2;
        const fechaVencimiento = new Date((new Date(data.prorrogaUno).getMonth() == month) ? data?.prorrogaUno : (new Date(data?.prorrogaDos).getMonth() == month) ? data?.prorrogaDos : data?.prorrogaTres)
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        const textoVencimiento = `Hola ${data?.nombre},
        
        A continuación, comparto carta de vencimiento de contrato correspondiente al mes de ${months[fechaVencimiento.getMonth()]} de ${fechaVencimiento.getFullYear()}; solicito el favor de imprimir, firmar y enviar nuevamente escaneada lo más pronto posible para su respectivo archivo.

Por favor devolver el documento al siguiente correo diosorio@levi.com 

¡Le agradecemos de antemano por su pronta atención a este asunto y esperamos recibir la carta de vencimiento firmada lo más pronto posible.

Quedo atenta a sus comentarios.

Diana Carolina Osorio Ruiz
Recruiting Analyst Colombia
        `;

        let textFinal = "";
        switch (tipoCertificado) {
            case 'activo':
                textFinal = textoActivo
                break;
            case 'retirado':
                textFinal = textoRetirado
                break;
            case 'vencimiento':
                textFinal = textoVencimiento
                break;
        }

        const lines = wrapText(textFinal, fontNormal, 12, maxWidth);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const isLastLine = i === lines.length - 1 || line.trim() === "";

            drawJustifiedText(page, line, marginX, y, fontNormal, 12, maxWidth, isLastLine);
            y -= 12 * 1.5;
        }
    };

    addPagePDF();

    const pdfBytes = await pdfDoc.save();
    await printPdfBytes(pdfBytes);

    return new Blob([pdfBytes as BlobPart], {type: "application/pdf"});
}

