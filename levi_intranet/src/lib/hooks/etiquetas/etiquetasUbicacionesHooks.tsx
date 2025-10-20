"use client";
import {PDFDocument, rgb, StandardFonts} from "pdf-lib";
import bwipjs from "bwip-js";
import {UbicacionesInterface} from "@/lib/interfaces/_interfaces";

const LABEL_WIDTH_IN = 3.937; // ancho de cada sticker en pulgadas
const LABEL_HEIGHT_IN = 1.929;   // alto de cada sticker en pulgadas
const PT_PER_IN = 72;       // 72 puntos PDF reales
const W_PT = LABEL_WIDTH_IN * PT_PER_IN;
const H_PT = LABEL_HEIGHT_IN * PT_PER_IN;

// Tres por página + gutter entre cada una
const LABELS_PER_ROW = 1;
const GUTTER_IN = 0.08; // margen entre stickers (en pulgadas)
const GUTTER_PT = GUTTER_IN * PT_PER_IN;

// El tamaño de página será exactamente el ancho de 1 stickers + 2 gutters, y el alto de 1 sticker
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
})
{
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
        includetext: false,
        backgroundcolor: "ffffff",
        paddingwidth: 0,
        paddingheight: 0,
        guardwhitespace: true,
    });

    const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
    const buf = await blob.arrayBuffer();
    return new Uint8Array(buf);
}
async function makeQRPng({
                                  text,
                                  widthIn = LABEL_WIDTH_IN,
                                  heightIn = LABEL_HEIGHT_IN * 0.7, // barras ~70% del alto
                                  dpi = 203,
                              }: {
    text: string;
    widthIn?: number;
    heightIn?: number;
    dpi?: number;
})
{
    const pxW = Math.max(140, Math.round(widthIn * dpi));  // ~1.25" * 203 ≈ 254px
    const pxH = Math.max(140, Math.round(heightIn * dpi)); // lo justo para buen contraste

    const canvas = document.createElement("canvas");
    canvas.width = pxW;
    canvas.height = pxH;

    const bcid = "azteccode" // Tipo Codigo Barra
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
    qrImg,
                       originX,
                       bodegaId,
                       bodegaDescripcion,
                       ubicacionId,
                       ubicacionDescripcion,
                   }: {
    page: any;
    fonts: { helv: any; helvBold: any };
    barcodeImg: any;
    qrImg: any;
    originX: number;
    bodegaId: string;
    bodegaDescripcion: string;
    ubicacionId: string;
    ubicacionDescripcion: string;
}) =>
{

    const {helv, helvBold} = fonts;

    const margin = Math.round(0.3 * PT_PER_IN); // margen interno de cada sticker
    const y = H_PT - margin - 5;

    const compania = "Levi Strauss Colombia SAS"
    const companiaSize = Math.round(0.2 * PT_PER_IN);
    page.drawText(compania, {
        x: originX + 10,
        y: y + 5,
        size: companiaSize,
        font: helv,
        color: rgb(0, 0, 0),
    });

    // Talla
    const bodegaText = `Bodega: ${bodegaId} - ${bodegaDescripcion}`;
    const bodegaSize = Math.round(0.13 * PT_PER_IN);
    page.drawText(bodegaText, {
        x: originX + 10,
        y: y - 10,
        size: bodegaSize,
        font: helv,
        color: rgb(0, 0, 0),
    });

    // Código de barras (ocupando casi todo el sticker)
    page.drawImage(barcodeImg, {
        x: (W_PT - (W_PT - 80)) / 2,
        y: y - 60,
        width: W_PT - 100,
        height: 40,
    });

    // Código de barras (ocupando casi todo el sticker)
    page.drawImage(qrImg, {
        x: W_PT - 40,
        y: y - 20,
        width:30,
        height: 30,
    });

    const textoCodigoBarra = ubicacionId
    const textoCodigoBarraSize = Math.round(0.35 * PT_PER_IN);
    page.drawText(textoCodigoBarra, {
        x: ((W_PT - (helvBold.widthOfTextAtSize(textoCodigoBarra, textoCodigoBarraSize)) - 20) / 2),
        y: y- 85,
        size: textoCodigoBarraSize,
        font: helv,
        color: rgb(0, 0, 0),
    });
    // Precio
    const zonaText = ubicacionDescripcion
    const zonaSize = Math.round(0.12 * PT_PER_IN);
    page.drawText(zonaText, {
        x: originX + 10,
        y: 15,
        size: zonaSize,
        font: helvBold,
        color: rgb(0, 0, 0),
    });

};

export const generarPDFUbicaciones = async (data: UbicacionesInterface[]) => {
    const pdfDoc = await PDFDocument.create();
    const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fonts = {helv, helvBold};

    // Cache para no recalcular/embeber el mismo barcode
    const barcodeCache = new Map<string, any>(); // value: EmbeddedPng
    const qrCache = new Map<string, any>(); // value: EmbeddedPng

    // Manejo de slots: 0..2 en la página actual
    let slot = 0; // posición 0,1,2
    let page = pdfDoc.addPage([PAGE_W_PT, PAGE_H_PT]);

    // Helper para empezar una página nueva cuando el slot vuelve a 0
    const newPage = () => {
        page = pdfDoc.addPage([PAGE_W_PT, PAGE_H_PT]);
    };

    // Recorremos los ítems en orden
    for (const ubicacion of data) {

        // Obtén/crea el PNG + embed para este código de barras
        let barcodeImg = barcodeCache.get(ubicacion.id);
        let qrImg = qrCache.get(ubicacion.id);
        if (!barcodeImg) {
            const png = await makeBarcodePng({
                text: ubicacion.id || "000000000000",
                widthIn: LABEL_WIDTH_IN,
                heightIn: LABEL_HEIGHT_IN,
                dpi: 203,
            });
            barcodeImg = await pdfDoc.embedPng(png);
            barcodeCache.set(ubicacion.id, barcodeImg);
        }
        if (!qrImg) {
            const png = await makeQRPng({
                text: ubicacion.id || "000000000000",
                widthIn: LABEL_WIDTH_IN,
                heightIn: LABEL_HEIGHT_IN,
                dpi: 203,
            });
            qrImg = await pdfDoc.embedPng(png);
            qrCache.set(ubicacion.id, qrImg);
        }

        const originX = slot * (W_PT + GUTTER_PT);

        drawLabel({
            page,
            fonts,
            barcodeImg,
            qrImg,
            originX,
            ubicacionId: ubicacion.id,
            ubicacionDescripcion: ubicacion.descripcion,
            bodegaDescripcion: ubicacion.descripcionCortaBodega,
            bodegaId: ubicacion.bodegaId
        });
        newPage()
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