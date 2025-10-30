"use client";
import {PDFDocument, rgb, StandardFonts} from "pdf-lib";
import bwipjs from "bwip-js";
import {ActivosFijosInterface, UbicacionesInterface} from "@/lib/interfaces/_interfaces";
import {getTipoInventarios} from "@/lib/hooks/api/siesaBackEndAPI";

const LABEL_WIDTH_IN = 1.968503937; // ancho de cada sticker en pulgadas
const LABEL_HEIGHT_IN = 0.9842519685;   // alto de cada sticker en pulgadas
const PT_PER_IN = 72;       // 72 puntos PDF reales
const W_PT = LABEL_WIDTH_IN * PT_PER_IN;
const H_PT = LABEL_HEIGHT_IN * PT_PER_IN;

// Tres por página + gutter entre cada una
const LABELS_PER_ROW = 2;
const GUTTER_IN = 0.08; // margen entre stickers (en pulgadas)
const GUTTER_PT = GUTTER_IN * PT_PER_IN;

// El tamaño de página será exactamente el ancho de 1 stickers + 2 gutters, y el alto de 1 sticker
const PAGE_W_PT = LABELS_PER_ROW * W_PT + (LABELS_PER_ROW - 1) * GUTTER_PT;
const PAGE_H_PT = H_PT;

// Utilidad para hacer PNG de un EAN13/Code128 a la resolución correcta (dpi térmico típico: 203)
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
                       qrImg,
                       originX,
                       idActivoFijo,
                       activoFijoDescripcion,
                       marca,
                       serie,
                       modelo,
    tipoInventario
                   }: {
    page: any;
    fonts: { helv: any; helvBold: any };
    qrImg: any;
    originX: number;
    idActivoFijo: string,
    activoFijoDescripcion: string,
    marca: string,
    serie: string,
    modelo: string,
    tipoInventario: string,
}) =>
{

    const {helv, helvBold} = fonts;

    const margin = Math.round(0.3 * PT_PER_IN); // margen interno de cada sticker
    const y = H_PT - margin - 5;

    const descripcion = activoFijoDescripcion;
    const descripcionSize = Math.round(0.1 * PT_PER_IN);
    page.drawText(descripcion, {
        x: originX + ((W_PT - (helvBold.widthOfTextAtSize(descripcion, descripcionSize))) / 2),
        y: y + 15,
        size: descripcionSize,
        font: helv,
        color: rgb(0, 0, 0),
    });
    const tipoInvActivoFijo = tipoInventario
    const tipoInvActivoFijoSize = Math.round(0.1 * PT_PER_IN);
    page.drawText(tipoInvActivoFijo, {
        x: originX + 45,
        y: y + 5,
        size: tipoInvActivoFijoSize,
        font: helvBold,
        color: rgb(0, 0, 0),
    });
    const marcaActivoFijo = `Marca: ${marca}`;
    const marcaActivoFijoSize = Math.round(0.1 * PT_PER_IN);
    page.drawText(marcaActivoFijo, {
        x: originX + 45,
        y: y - 5,
        size: marcaActivoFijoSize,
        font: helv,
        color: rgb(0, 0, 0),
    });
    const modeloActivoFijo = `Modelo: ${modelo}`;
    const modeloActivoFijoSize = Math.round(0.1 * PT_PER_IN);
    page.drawText(modeloActivoFijo, {
        x: originX + 45,
        y: y - 15,
        size: modeloActivoFijoSize,
        font: helv,
        color: rgb(0, 0, 0),
    });
    const serialActivoFijo = `Serial: ${serie}`;
    const serialActivoFijoSize = Math.round(0.1 * PT_PER_IN);
    page.drawText(serialActivoFijo, {
        x: originX + 45,
        y: y - 25,
        size: serialActivoFijoSize,
        font: helv,
        color: rgb(0, 0, 0),
    });

    // Tipo Inventario
    const numeroActivoFijo = idActivoFijo
    const numeroActivoFijoSize = Math.round(0.1 * PT_PER_IN);
    page.drawText(numeroActivoFijo, {
        x: originX + 5 + ((W_PT - (W_PT - 30) - (helvBold.widthOfTextAtSize(numeroActivoFijo, numeroActivoFijoSize))))/2,
        y: y - 30,
        size: numeroActivoFijoSize,
        font: helvBold,
        color: rgb(0, 0, 0),
    });

    // Código de barras (ocupando casi todo el sticker)
    page.drawImage(qrImg, {
        x: originX + 5,
        y: y - 20,
        width:30,
        height: 30,
    });
};

export const generarPDFActivosFijos = async (data: ActivosFijosInterface[]) => {
    const pdfDoc = await PDFDocument.create();
    const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fonts = {helv, helvBold};

    const qrCache = new Map<string, any>(); // value: EmbeddedPng

    // Manejo de slots: 0..2 en la página actual
    let slot = 0; // posición 0,1,2
    let page = pdfDoc.addPage([PAGE_W_PT, PAGE_H_PT]);

    // Helper para empezar una página nueva cuando el slot vuelve a 0
    const newPage = () => {
        page = pdfDoc.addPage([PAGE_W_PT, PAGE_H_PT]);
    };

    // Recorremos los ítems en orden
    for (const activoFijo of data) {

        let qrImg = qrCache.get(activoFijo.idActivoFijo);
        if (!qrImg) {
            const png = await makeQRPng({
                text: activoFijo.idActivoFijo || "000000000000",
                widthIn: LABEL_WIDTH_IN,
                heightIn: LABEL_HEIGHT_IN,
                dpi: 203,
            });
            qrImg = await pdfDoc.embedPng(png);
            qrCache.set(activoFijo.idActivoFijo, qrImg);
        }

        const originX = slot * (W_PT + GUTTER_PT);

        drawLabel({
            page,
            fonts,
            qrImg,
            originX,
            idActivoFijo: activoFijo.idActivoFijo,
            activoFijoDescripcion: activoFijo.descripcion,
            marca: activoFijo.marca,
            serie: activoFijo.serie,
            modelo: activoFijo.modelo,
            tipoInventario: activoFijo.tipoInventario?.idTipoInventario
        });

        slot++;
        if (slot === LABELS_PER_ROW) {
            slot = 0;
            newPage();
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