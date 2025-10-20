import fs from 'fs';
import {PDFDocument, PDFPage, rgb, StandardFonts} from 'pdf-lib';
import {printPdfBytes} from "@/lib/hooks/etiquetas/etiquetasHooks";
import {getRemisionesByConsecutivo} from "@/lib/hooks/api/siesaBackEndAPI";
import {FilesDownloadInterface, ProductoRemisionInterface} from "@/lib/interfaces/_interfaces";


export async function generate(data: ProductoRemisionInterface[], numeroRemision: string) {

    data.sort((a, b) => {
        return String(a.producto).localeCompare(String(b.producto), 'en', {numeric: true})
    })

    const total = data.reduce<Record<string, number>>((acum, fila) => {
        const codigo = String(fila.producto);
        const cantidad = Number(fila.cantidad);
        if (!isNaN(cantidad)) {
            acum[codigo] = (acum[codigo] || 0) + cantidad;
        } else {
            console.warn(`Cantidad inválida en producto ${codigo}:`, fila.cantidad);
        }

        return acum;
    }, {});

    let currentProduct = ""

    let wordWrap = false;
    let counterWrap = 0;

    const calculateTextArea  = (text: string, maxLength: number)  => {
        if (text.length > maxLength) {
            wordWrap = true;
            const indexLastWhiteSpace = text.slice(0, maxLength).lastIndexOf(" ");
            let textWrapped = text.slice(indexLastWhiteSpace + 1, text.length)
            if (textWrapped.length > maxLength) {
                textWrapped = calculateTextArea(textWrapped, 25)
            }
            const newText = text.slice(0, indexLastWhiteSpace) + "\n" + textWrapped
            return newText
        }
        return text
    }

    const calculateTextAreaHeader = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            const indexLastWhiteSpace = text.slice(0, maxLength).lastIndexOf(" ");
            let textWrapped = text.slice(indexLastWhiteSpace + 1, text.length)
            if (textWrapped.length > maxLength) {
                textWrapped = calculateTextAreaHeader(textWrapped, 25)
            }
            const newText = text.slice(0, indexLastWhiteSpace) + "\n" + textWrapped
            return newText
        }
        return text
    }

    const pdfDoc = await PDFDocument.create();
    const imageUrl = "/images/Levis-LogoEscalaGrises.png";
    const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(imageBytes);
    let page: PDFPage;
    // Fuentes
    const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    let y: number;
    let pagina = 0;
    let newPage = false
    // Crear documento
    const addPagePDF = () => {
        newPage = true;
        pagina++;
        page = pdfDoc.addPage([612, 792]); // tamaño Carta
        const {height} = page.getSize();

        // Margen inicial
        y = height - 40;

        // // === ENCABEZADO ===

        page.drawImage(pngImage, {
            x: 40,
            y: y - 60,
            width: 100,
            height: 50,
        });
        y -= 20;
        page.drawText("LEVI STRAUSS COLOMBIA SAS", {x: 150, y: y - 10, size: 15, font: fontBold});
        page.drawText('REMISIÓN', {x: 450, y: y - 10, size: 14, font: fontBold});
        page.drawText('No.' + numeroRemision, {x: 450, y: y - 25, size: 12, font: fontNormal});
        page.drawText('Pg. ' + pagina, {x: 450, y: y - 40, size: 12, font: fontNormal});

        y -= 25;
        page.drawText('CALLE 72 #44 - 185 - ITAGÜI-COLOMBIA', {x: 150, y, size: 10, font: fontBold});

        page.drawText('NIT:', {x: 150, y: y - 15, size: 10, font: fontBold});
        page.drawText('901778500', {x: 175, y: y - 15, size: 10, font: fontNormal});
        page.drawText('Responsables de IVA - No Somos Agentes de Retención del Impuesto Sobre las Ventas (IVA)', {x: 40, y: y - 30, size: 9, font: fontNormal});

        // Línea divisoria
        page.drawLine({start: {x: 40, y: y - 35}, end: {x: 550, y: y - 35}, thickness: 1, color: rgb(0, 0, 0)});

        y -= 50;

        // === DATOS CLIENTE ===
        page.drawText('CLIENTE:', {x: 40, y, size: 10, font: fontBold});
        const nombreCliente = calculateTextAreaHeader('CENCOSUD COLOMBIA S.A.', 25)
        page.drawText(nombreCliente, {x: 110, y, size: 10, font: fontNormal, lineHeight: 11});
        page.drawText('ORDEN DE COMPRA:', {x: 300, y, size: 10, font: fontBold});
        page.drawText(data[0].oc, {x: 410, y, size: 10, font: fontNormal});
        y = (y - (nombreCliente.split("\n").length) * 15)
        page.drawText('NIT:', {x: 40, y, size: 10, font: fontBold});
        page.drawText('900150167', {x: 110, y, size: 10, font: fontNormal});
        page.drawText('FECHA EXPEDICIÓN:', {x: 300, y, size: 10, font: fontBold});
        const fechaExpedicion = function getFormattedDateTime() {
            const now = new Date();

            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = now.getFullYear();

            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
        }
        page.drawText(fechaExpedicion(), {x: 410, y, size: 10, font: fontNormal});
        y -= 15;
        page.drawText('DIRECCIÓN:', {x: 40, y, size: 10, font: fontBold});
        page.drawText('CARRERA 33 NO. 41-34', {x: 110, y, size: 10, font: fontNormal});
        page.drawText('ENTREGAR A:', {x: 300, y: y, size: 10, font: fontBold});
        const entregarA = calculateTextAreaHeader(String(data[0].cedi).trim() + " - " + data[0].direccion, 25)
        page.drawText(entregarA, {x: 410, y: y, size: 10, font: fontNormal, lineHeight: 11});
        y -= 15;
        page.drawText('TELEFONO:', {x: 40, y, size: 10, font: fontBold});
        const telefono = calculateTextAreaHeader(String(data[0].telefono).trim(), 25)
        page.drawText(telefono, {x: 110, y, size: 10, font: fontNormal, lineHeight: 11});
        y = (y - (telefono.split("\n").length) * 15)
        page.drawText('SUCURSAL:', {x: 40, y, size: 10, font: fontBold});
        page.drawText(data[0].cedi, {x: 110, y, size: 10, font: fontNormal});
        y = (y - (entregarA.split("\n").length) * 5)
        const totalProductos = data.reduce((acum, fila) => acum + fila.cantidad, 0);
        y = (y - (entregarA.split("\n").length - 1) * 10)
        page.drawText("Total Unidades:", {x: 400, y: y + 5, size: 10, font: fontBold, lineHeight: 11});
        page.drawText(String(totalProductos), {x: 520, y: y + 5, size: 10, font: fontNormal});
        // Línea divisoria
        page.drawLine({start: {x: 40, y}, end: {x: 550, y}, thickness: 1, color: rgb(0, 0, 0)});


        y -= 20;

        // === ENCABEZADO DE TABLA ===
        page.drawText('Producto', {x: 40, y, size: 9, font: fontBold});
        page.drawText('Talla', {x: 120, y, size: 9, font: fontBold});
        page.drawText('Referencia', {x: 180, y, size: 10, font: fontBold});
        page.drawText('Descripción', {x: 320, y, size: 10, font: fontBold});
        page.drawText('Cantidad', {x: 500, y, size: 10, font: fontBold});

        y -= 20;

    }

    addPagePDF()

    data.forEach((prod, index) => {
        if (String(prod.producto) !== currentProduct && !newPage) {
            page.drawLine({start: {x: 40, y: y + 15}, end: {x: 550, y: y + 15}, thickness: 1, color: rgb(0, 0, 0)});
        }
        newPage = false
        page.drawText(String(prod.producto) !== currentProduct ? String(prod.producto) : "", {x: 40, y, size: 10, font: fontBold});
        if (String(prod.producto) !== currentProduct) {
            currentProduct = String(prod.producto)
        }
        const talla = calculateTextArea(prod.talla, 25);
        page.drawText(talla, {x: 120, y, size: 10, font: fontNormal, lineHeight: 11});
        const referencia = calculateTextArea(prod.referencia.trim(), 25)
        page.drawText(referencia, {x: 180, y, size: 10, font: fontNormal, lineHeight: 11});
        const descripcion = calculateTextArea(prod.descripcion.trim(), 25)
        page.drawText(descripcion, {x: 320, y, size: 10, font: fontNormal, lineHeight: 11});
        page.drawText(String(prod.cantidad), {x: 520, y, size: 10, font: fontNormal});

        counterWrap = Math.max(talla.split("\n").length, referencia.split("\n").length, descripcion.split("\n").length)

        if (wordWrap) {
            y -= 20 + counterWrap * 10;
        } else {
            y -= 25;
        }

        const nextIndex = index + 1 < data.length ? index + 1 : index

        if (String(data[nextIndex].producto) !== currentProduct || index == data.length - 1) {
            page.drawText("Total Productos (" + currentProduct + "): ", {x: 370, y, size: 10, font: fontBold, lineHeight: 11});


            page.drawText(String(total[currentProduct]), {x: 520, y, size: 10, font: fontNormal});

            y -= 25;
        }

        if (y < 150 && index < data.length - 1) {
            // === PIE DE PÁGINA ===
            page.drawText(
                'Actividad Económica 4642 - Comercio al por mayor de prendas de vestir.',
                {x: 180, y: 60, size: 8, font: fontNormal}
            );
            page.drawText('Remision por Computador', {x: 260, y: 45, size: 8, font: fontNormal});
            page.drawText('ORIGINAL', {x: 290, y: 30, size: 8, font: fontNormal});

            addPagePDF()
        }

        counterWrap = 0
        wordWrap = false
    });


    // Guardar archivo
    const pdfBytes = await pdfDoc.save(); // <- Uint8Array
    await printPdfBytes(pdfBytes);

    const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });

    return blob
}

export async function getDataRemisiones(data: Record<string, string>[], numeroRemision: string) {

    const consecutivos = [
        ...new Set(
            data
                .map(r => {
                    const val = r["Nro documento  "]?.toString().trim() || "";
                    const sub = val.substring(8, 16);
                    const num = Number(sub);
                    return Number.isNaN(num) ? "" : String(num);
                })
                .filter(s => s !== "")
        )
    ];

    const remisionesDocumento: ProductoRemisionInterface[] = await getRemisionesByConsecutivo(consecutivos)

    const cedis = [...new Set(remisionesDocumento.map((r) => r.cedi))]

    const remisionesDocumentos: FilesDownloadInterface[] = []

    let siguienteNumeroRemision = Number(numeroRemision);

    for (const cedi of cedis) {

        siguienteNumeroRemision++;

        const rows = remisionesDocumento.filter((r) => r.cedi === cedi);

        if (rows.length === 0) continue;

        const archivo = await generate(rows, String(siguienteNumeroRemision))

        remisionesDocumentos.push({
            nombreArchivo: "RemisionJumboTTI Nro " + siguienteNumeroRemision + " " + rows[0].cedi.trim() + ".pdf",
            archivo
        })

    }

    return remisionesDocumentos
}
