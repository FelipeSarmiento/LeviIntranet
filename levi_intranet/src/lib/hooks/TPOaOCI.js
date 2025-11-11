"use client";

import {getAllItemsByIds, getAllTasaCambio} from "./api/siesaBackEndAPI";

export async function generatePlanoOCI(data) {

    const centroOperativo = "001";
    const tasasCambio = await getAllTasaCambio();

    const numeroRegistroInicial = "0000001";
    const tipoRegistroInicial = "0000";
    const subTipoRegistroInicial = "00";
    const versionTipoRegistroInicial = "01";
    const compania = "001";

    const cabecera = numeroRegistroInicial + tipoRegistroInicial + subTipoRegistroInicial + versionTipoRegistroInicial + compania;
    const lines = [cabecera];
    const linesDocumentos = [];
    const linesMovimientos = [];

    const date = new Date();
    const fechaHoy = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

    // Agrupar por Sales Order
    const documentos = [...new Set(data.map((r) => r["Sales Order"]))];
    const items = [...new Set(data.map((r) => r["ItemID"]))];

    const allItems = await getAllItemsByIds(items, "01");

    let consecutivo = 1;
    let contadorDetalle = 1;
    let contadorMovimientos = documentos.length + 1;

    for (const documento of documentos) {
        consecutivo++;

        const rows = data.filter((r) => r["Sales Order"] === documento);

        if (rows.length === 0) continue;


        let billingDate = new Date(((Number(rows[0]["Billing Date"])) - 25569) * 86400 * 1000)
        billingDate = `${billingDate.getFullYear()}-${String(billingDate.getMonth() + 1).padStart(2, '0')}-${String(billingDate.getDate()).padStart(2, '0')}`;

        const tasaCambioDocumento = tasasCambio.find((tasa) => String(tasa.fecha) === String(billingDate))

        let numeroRegistroDocumento = consecutivo.toString().padStart(7, "0");
        let tipoRegistroDocumento = "0420".padStart(4, "0");
        let subTipoRegistroDocumento = "00".padStart(2, "0");
        let versionTipoRegistroDocumento = "05".padStart(2, "0");
        let companiaDocumento = compania.padStart(3, "0");
        let liquidaImpuestoDocumento = "1".padStart(1, "0");
        let consecutivoAutoManuDocumento = "1".padStart(1, "0");
        let centroOperacionDocumento = centroOperativo.padStart(3, "0");
        let tipoDocumento = "OCI".padStart(3, "0");
        let numeroDocumento = String(contadorDetalle).padStart(8, "0");
        let fechaDocumento = fechaHoy.padStart(8, " ");
        let conceptoDocumento = "401".padStart(3, " ");
        let grupoClaseDocumento = "402".padStart(3, " ");
        let claseInternaDocumento = "404".padStart(3, " ");
        let estadoDocumento = "1".padStart(1, " ");
        let estadoImpresionDocumento = "1".padStart(1, " ");
        let terceroCompradorDocumento = "1045425106".padEnd(15, " ");
        let terceroProveedorDocumento = "LSM660818M98".padEnd(15, " ");
        let sucursalProveedorDocumento = "001".padEnd(3, " ");
        let condicionPagoDocumento = "60D".padEnd(3, " ");
        let indicadorTasaDocumento = "1".padEnd(1, " ");
        let monedaDocumento = "USD".padEnd(3, " ");
        let monedaBaseConversionDocumento = "COP".padEnd(3, " ");
        let tasaConversionDocumento = "00000001.0000".padEnd(13, " ");
        let monedaLocalDocumento = "COP".padEnd(3, " ");
        let tasaLocal = truncateDecimalString(String(tasaCambioDocumento.tasa), 4);
        let tasaLocalDocumento = tasaLocal.padStart(13, "0")
        let descuentoGlobal1Documento = "000.0000".padEnd(8, " ");
        let descuentoGlobal2Documento = "000.0000".padEnd(8, " ");
        let notasDocumento = String(rows[0]["NOTAS"]).padEnd(255, " ");
        let indicadorContactoDocumento = "1".padEnd(1, " ");
        let contactoDocumento = "".padEnd(50, " ");
        let direccion1Documento = "".padEnd(40, " ");
        let direccion2Documento = "".padEnd(40, " ");
        let direccion3Documento = "".padEnd(40, " ");
        let paisDocumento = "".padEnd(3, " ");
        let departamentoDocumento = "".padEnd(2, " ");
        let ciudadDocumento = "".padEnd(3, " ");
        let barrioDocumento = "".padEnd(40, " ");
        let telefonoDocumento = "".padEnd(20, " ");
        let faxDocumento = "".padEnd(20, " ");
        let codigoPostalDocumento = "".padEnd(10, " ");
        let emailDocumento = "".padEnd(50, " ");
        let docReferenciaDocumento = rows[0]["Sales Order"].padEnd(15, " ");
        let mandatoDocumento = "".padEnd(15, " ");
        let indicadorConsignacionDocumento = "0".padEnd(1, '')
        let terceroSolicitanteDocumento = "1045425106".padEnd(15, " ");

        const encabezado = numeroRegistroDocumento + tipoRegistroDocumento + subTipoRegistroDocumento +
            versionTipoRegistroDocumento + companiaDocumento + liquidaImpuestoDocumento + consecutivoAutoManuDocumento +
            centroOperacionDocumento + tipoDocumento + numeroDocumento + fechaDocumento + conceptoDocumento +
            grupoClaseDocumento + claseInternaDocumento + estadoDocumento + estadoImpresionDocumento +
            terceroCompradorDocumento + terceroProveedorDocumento + sucursalProveedorDocumento + condicionPagoDocumento +
            indicadorTasaDocumento + monedaDocumento + monedaBaseConversionDocumento + tasaConversionDocumento +
            monedaLocalDocumento + tasaLocalDocumento + descuentoGlobal1Documento + descuentoGlobal2Documento +
            notasDocumento + indicadorContactoDocumento + contactoDocumento + direccion1Documento + direccion2Documento + direccion3Documento +
            paisDocumento + departamentoDocumento + ciudadDocumento + barrioDocumento + telefonoDocumento + faxDocumento +
            codigoPostalDocumento + emailDocumento + docReferenciaDocumento + mandatoDocumento +
            indicadorConsignacionDocumento + terceroSolicitanteDocumento;
        

        linesDocumentos.push(encabezado);

        for (const row of rows) {

            contadorMovimientos++;

            const itemId = row["ItemID"];


            const item = allItems.find((item) => item.id === Number(itemId));

            let numeroRegistroMovimiento = contadorMovimientos.toString().padStart(7, "0");
            let tipoRegistroMovimiento = "0421".padStart(4, "0");
            let subTipoRegistroMovimiento = "0".padStart(2, "0");
            let versionTipoRegistroMovimiento = "03".padStart(2, "0");
            let companiaMovimiento = compania.padStart(3, "0");
            let centroOperacionM = centroOperativo.padStart(3, "0");
            let tipoDocumentoMovimiento = "OCI".padStart(3, "0");
            let consecutivoDocumentoMovimiento = contadorDetalle.toString().padStart(8, "0");
            let numeroRegistroMov = "1".toString().padStart(10, "0");
            let camposVacios = "".padEnd(55, " ");
            let bodegaMovimiento = "00072".padStart(5, " ");
            let conceptoMovimiento = "401".padEnd(3, " ");
            let motivoMovimiento = "02".padEnd(2, " ");
            let indicadorObsequioMovimiento = "0".padEnd(1, " ");
            let centroOperacionMovimiento = "001".padStart(3, "0");
            let camposVacios2 = "".padEnd(2, " ");
            let centroCostoMovimiento = "9040004".padEnd(15, " ");
            let proyectoMovimiento = "".padStart(15, " ");
            let unidadMedidaMovimiento = "UND".padEnd(4, " ");
            let cantidadPedidaMovimiento = String(row["Billed Quantity"]).padStart(15, "0") + ".0000";
            let fechaEntregaMovimiento = fechaHoy.padEnd(8, "0");
            let itemEntregaMovimiento = "".padEnd(15, " ");
            let valorPrecio = truncateDecimalString(String(row["Price"]), 4);
            let precioUnitarioMovimiento = valorPrecio.padStart(20, "0");
            let notasMovimiento = "PTO TERMINADO".padEnd(255, " ");
            let detalleMovimiento = "".padEnd(2000, " ");
            let descripcionItemMovimiento = "".padEnd(40, " ");
            let unidadMedidaInventarioMovimiento = "".padEnd(4, " ");
            let itemMovimiento = String(row["ItemID"]).padStart(7, "0");
            let referenciaItemMovimiento = "".padEnd(50, " ");
            let codigoBarrasMovimiento = "".padEnd(20, " ");
            let extension1Movimiento = String(item?.extension1).padEnd(20, " ");
            let extension2Movimiento = String(row["Talla"]).padEnd(20, " ");
            let unidadNegocioMovimiento = "99".padEnd(20, " ");

            const linea = numeroRegistroMovimiento + tipoRegistroMovimiento + subTipoRegistroMovimiento + versionTipoRegistroMovimiento + companiaMovimiento + centroOperacionM + tipoDocumentoMovimiento + consecutivoDocumentoMovimiento + numeroRegistroMov + camposVacios + bodegaMovimiento + conceptoMovimiento + motivoMovimiento + indicadorObsequioMovimiento + centroOperacionMovimiento + camposVacios2 + centroCostoMovimiento + proyectoMovimiento + unidadMedidaMovimiento + cantidadPedidaMovimiento + fechaEntregaMovimiento + itemEntregaMovimiento + precioUnitarioMovimiento + notasMovimiento + detalleMovimiento + descripcionItemMovimiento + unidadMedidaInventarioMovimiento + itemMovimiento + referenciaItemMovimiento + codigoBarrasMovimiento + extension1Movimiento + extension2Movimiento + unidadNegocioMovimiento;

            linesMovimientos.push(linea);

        }

        contadorDetalle = contadorDetalle + 1;

    }

    const finalLines = lines.concat(linesDocumentos, linesMovimientos);

    // Final
    const numeroRegistroFinal = (contadorMovimientos + 1).toString().padStart(7, "0");
    const tipoRegistroFinal = "9999";
    const subTipoRegistroFinal = "00";
    const versionTipoRegistroFinal = "01";
    const final = numeroRegistroFinal + tipoRegistroFinal + subTipoRegistroFinal + versionTipoRegistroFinal + compania

    finalLines.push(final);

    return finalLines.join("\n");
}

function truncateDecimalString(str, decimals) {
    str = str.replace(",", "."); // invariant parsing
    let [intPart, decPart = ""] = str.split(".");
    decPart = decPart.padEnd(decimals, "0").slice(0, decimals);
    return `${intPart}.${decPart}`;
}