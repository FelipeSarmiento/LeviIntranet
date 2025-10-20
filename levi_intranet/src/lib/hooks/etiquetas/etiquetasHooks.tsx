"use client";
import {PDFDocument, rgb, StandardFonts} from "pdf-lib";
import bwipjs from "bwip-js";

const LABEL_WIDTH_IN = 1.25; // ancho de cada sticker en pulgadas
const LABEL_HEIGHT_IN = 1.1;   // alto de cada sticker en pulgadas
const PT_PER_IN = 72;       // 72 puntos PDF reales
const W_PT = LABEL_WIDTH_IN * PT_PER_IN;
const H_PT = LABEL_HEIGHT_IN * PT_PER_IN;

// 🧩 Tres por página + gutter entre cada una
const LABELS_PER_ROW = 3;
const GUTTER_IN = 0.08; // margen entre stickers (en pulgadas)
const GUTTER_PT = GUTTER_IN * PT_PER_IN;

// El tamaño de página será exactamente el ancho de 3 stickers + 2 gutters, y el alto de 1 sticker
const PAGE_W_PT = LABELS_PER_ROW * W_PT + (LABELS_PER_ROW - 1) * GUTTER_PT;
const PAGE_H_PT = H_PT;

// Utilidad para hacer PNG de un EAN13/Code128 a la resolución correcta (dpi térmico típico: 203)
async function makeBarcodePng({
                                  text,
                                  widthIn = LABEL_WIDTH_IN,
                                  heightIn = LABEL_HEIGHT_IN * 0.7, // barras ~70% del alto
                                  dpi = 203,
                              }: {
    text: string;
    widthIn?: number;
    heightIn?: number;
    dpi?: number;
}) {
    const pxW = Math.max(140, Math.round(widthIn * dpi));  // ~1.25" * 203 ≈ 254px
    const pxH = Math.max(90, Math.round(heightIn * dpi)); // lo justo para buen contraste

    const canvas = document.createElement("canvas");
    canvas.width = pxW;
    canvas.height = pxH;

    const bcid = /^\d{12,13}$/.test(text) ? "ean13" : "code128";

    bwipjs.toCanvas(canvas, {
        bcid,
        text,
        // Heurística: escala baja = mucho más rápido
        scale: Math.max(2, Math.floor(pxW / 120)),
        height: Math.floor(pxH * 0.9),
        includetext: false,            // 🔥 APAGADO: lo dibujas tú si quieres
        backgroundcolor: "ffffff",
        paddingwidth: 0,
        paddingheight: 0,
        guardwhitespace: true,
    });

    const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
    const buf = await blob.arrayBuffer();
    return new Uint8Array(buf);
}

const drawLabel = ({
                       page,
                       fonts,
                       barcodeImg,
                       originX,
                       title,
                       talla,
                       precio,
                       barcode,
                       description
                   }: {
    page: any;
    fonts: { helv: any; helvBold: any };
    barcodeImg: any;
    originX: number;
    title: string;
    description: string;
    precio: string;
    barcode: string;
    talla: string;
}) =>
{

    const {helv, helvBold} = fonts;

    const margin = Math.round(0.3 * PT_PER_IN); // margen interno de cada sticker
    let y = H_PT - margin;

    title = title.slice(0, 40);
    const titleSize = Math.round(0.1 * PT_PER_IN);
    page.drawText(title, {
        x: originX + 10,
        y: y + 5,
        size: titleSize,
        font: helv,
        color: rgb(0, 0, 0),
    });

    // Talla
    talla = talla.slice(0, 40).padStart(5, " ");
    const tallaSize = Math.round(0.1 * PT_PER_IN);
    page.drawText(talla, {
        x: originX + 10 + (W_PT - W_PT / 3),
        y: y + 5,
        size: tallaSize,
        font: helv,
        color: rgb(0, 0, 0),
    });

    // Descripción
    description = description.slice(0, 40);
    const descriptionSize = Math.round(0.08 * PT_PER_IN);
    page.drawText(description, {
        x: originX + 10,
        y: y - 3,
        size: descriptionSize,
        font: helv,
        color: rgb(0, 0, 0),
    });

    y -= descriptionSize + Math.round(0.12 * PT_PER_IN);

    // Código de barras (ocupando casi todo el sticker)
    page.drawImage(barcodeImg, {
        x: originX + 10,
        y: 27,
        width: W_PT - 10,
        height: H_PT - 55,
    });

    // Precio
    const barcodeText = barcode.slice(0, 40).split("").join(" ");
    const barcodeSize = Math.round(0.1005 * PT_PER_IN);
    page.drawText(barcodeText, {
        x: originX + 11,
        y: 20,
        size: barcodeSize,
        font: helv,
        color: rgb(0, 0, 0),
    });
    // Precio
    precio = precio.slice(0, 40);
    const precioSize = Math.round(0.1 * PT_PER_IN);
    page.drawText(precio, {
        x: originX + 10 + W_PT / 2,
        y: 10,
        size: precioSize,
        font: helvBold,
        color: rgb(0, 0, 0),
    });
};

// Tipado sugerido (ajusta los nombres si difieren)
interface LabelItem {
    id: string | number;
    descripcion: string;
    precio: string;
    extension1: string;     // talla
    extension2: string;     // talla
    cantidad: number;       // cuántas etiquetas de este ítem
    codigoBarra: string;
}

export const generarPDF = async (data: LabelItem[]) => {
    const pdfDoc = await PDFDocument.create();
    const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fonts = {helv, helvBold};

    // Cache para no recalcular/embeber el mismo barcode
    const barcodeCache = new Map<string, any>(); // value: EmbeddedPng

    // Manejo de slots: 0..2 en la página actual
    let slot = 0; // posición 0,1,2
    let page = pdfDoc.addPage([PAGE_W_PT, PAGE_H_PT]);

    // Helper para empezar una página nueva cuando el slot vuelve a 0
    const newPage = () => {
        page = pdfDoc.addPage([PAGE_W_PT, PAGE_H_PT]);
    };

    // Recorremos los ítems en orden
    for (const item of data) {
        const count = Math.max(0, Number(item.cantidad) || 0);
        if (!count) continue;

        // Obtén/crea el PNG + embed para este código de barras
        let barcodeImg = barcodeCache.get(item.codigoBarra);
        if (!barcodeImg) {
            // Si el texto no es EAN13 válido, puedes cambiar a code128 automáticamente
            const isEan13 = /^\d{12,13}$/.test(item.codigoBarra || "");
            const png = await makeBarcodePng({
                text: item.codigoBarra || "000000000000",
                inchesWidth: LABEL_WIDTH_IN,
                inchesHeight: LABEL_HEIGHT_IN,
                dpi: 203,
            });
            barcodeImg = await pdfDoc.embedPng(png);
            barcodeCache.set(item.codigoBarra, barcodeImg);
        }

        // Dibuja 'count' etiquetas de este item
        for (let i = 0; i < count; i++) {
            // Si el slot es 0 pero NO es la primera etiqueta en el documento, crea una página nueva
            if (slot === 0 && (page.getWidth() !== 0 || page.getHeight() !== 0)) {
                // la primera page ya está creada antes del loop; solo creamos nuevas cuando llenamos 3
                if (page.getXObjectCount?.() !== undefined) {
                    // nada especial; mantenemos por claridad
                }
            }

            const originX = slot * (W_PT + GUTTER_PT);

            drawLabel({
                page,
                fonts,
                barcodeImg,
                originX,
                title: `Item: ${String(item.id ?? "")}`,
                description: String(item.descripcion.slice(0, 20) ?? ""),
                precio: String(new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0, // puedes ajustar si quieres mostrar decimales
                }).format(Number(item.precio.split(".")[0])).padStart(9, ' ')),
                talla: String(item.extension2 ?? ""),
                barcode: String(item.codigoBarra)
            });

            // Avanza al siguiente slot; si llenamos 3, resetea y crea nueva página
            slot++;
            if (slot === LABELS_PER_ROW && i <= (count - 1)) {
                slot = 0;
                newPage();
            }
        }
    }

    // Si la última página quedó vacía (porque abrimos una nueva al llenar justo 3),
    // pdf-lib no añade páginas “vacías” extra, así que no hay problema.

    const bytes = await pdfDoc.save();

    await printPdfBytes(bytes);

    const blob = new Blob([bytes], {type: "application/pdf"});
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");


};

export async function printPdfBytes(bytes: Uint8Array) {
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const iframe = document.createElement("iframe");
    // Mejor fuera de pantalla que display:none; algunos navegadores no renderizan PDFs ocultos.
    iframe.style.position = "fixed";
    iframe.style.left = "-10000px";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    // Limpieza
    const cleanup = () => {
        setTimeout(() => {
            document.body.removeChild(iframe);
            URL.revokeObjectURL(url);
        }, 0);
    };

    // Fallback por si la impresión no arranca sola (Safari/Edge cases)
    const fallbackTimer = setTimeout(() => {
        try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
        } catch {}
    }, 1200);

    return new Promise<void>((resolve, reject) => {
        iframe.onload = () => {
            clearTimeout(fallbackTimer);
            // Dar un mínimo de tiempo al visor PDF para inicializarse
            setTimeout(() => {
                try {
                    iframe.contentWindow?.focus();
                    iframe.contentWindow?.print();
                    // No todos disparan eventos post-print; resolvemos igual.
                    resolve();
                    cleanup();
                } catch (e) {
                    cleanup();
                    reject(e);
                }
            }, 200);
        };

        iframe.onerror = (e) => {
            clearTimeout(fallbackTimer);
            cleanup();
            reject(e as any);
        };

        iframe.src = url; // <- esto dispara onload cuando el visor del PDF está listo
    });
}

export function generateDataFromExcel(data) {

    const documentos = [...new Set(data.map((r) => r["Nro documento"]))];

    const rs = []

    for (const documento of documentos) {

        const doc = [];

        const rows = data.filter((r) => r["Nro documento"] === documento);

        for (const row of rows) {

            const item = {
                item: row["Item"].toString(),
                talla: row["talla"].toString(),
                color: row["COLOR"].toString(),
                cantidad: row["CANTIDAD"].toString(),
                codigoBarra: row["COD BARRAS"].toString()
            }

            doc.push(item)
        }

        rs.push(doc)

    }

    return rs
}