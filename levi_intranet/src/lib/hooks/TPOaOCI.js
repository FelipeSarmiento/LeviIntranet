"use client";

import {getAllTasaCambio} from "./api/siesaBackEndAPI";

export async function generatePlanoOCI(data, fechaISO, bodega, centroOperativo) {

    const tasasCambio = await getAllTasaCambio();

    const numeroRegistroInicial = "0000001";
    const tipoRegistroInicial = "0000";
    const subTipoRegistroInicial = "00";
    const versionTipoRegistroInicial = "01";
    const compania = "001";

    const cabecera = numeroRegistroInicial + tipoRegistroInicial + subTipoRegistroInicial + versionTipoRegistroInicial + compania;
    const lines = [cabecera];

    // Convertir fecha (yyyy-mm-dd → yyyymmdd)
    const [anio, mes, dia] = fechaISO.split("-");
    const fecha = `${anio}${mes}${dia}`;

    // Agrupar por Sales Order
    const documentos = [...new Set(data.map((r) => r["Sales Order"]))];

    let consecutivo = 1;
    let contadorDetalle = 1;

    for (const documento of documentos) {
        consecutivo = consecutivo + 1;

        const rows = data.filter((r) => r["Sales Order"] === documento);

        if (rows.length === 0) continue;

        const tasaCambioDocumento = tasasCambio.find((tasa) => tasa.fecha === row[0]["Billing Date"])

        let numeroRegistroDocumento = consecutivo.toString().padStart(7, "0");
        let tipoRegistroDocumento = "0420".padStart(4, "0");
        let subTipoRegistroDocumento = "00".padStart(2, "0");
        let versionTipoRegistroDocumento = "05".padStart(2, "0");
        let companiaDocumento = compania.padStart(3, "0");
        let liquidaImpuestoDocumento = "1".padStart(1, "0");
        let consecutivoAutoManuDocumento = "1".padStart(1, "0");
        let centroOperacionDocumento = centroOperativo.padStart(3, "0");
        let tipoDocumento = "OCI".padStart(3, "0");
        let numeroDocumento = contadorDetalle.padStart(8, "0");
        let fechaDocumento = fecha.padStart(8, " ");
        let conceptoDocumento = "401".padStart(3, " ");
        let grupoClaseDocumento = "402".padStart(3, " ");
        let claseInternaDocumento = "404".padStart(3, " ");
        let estadoDocumento = "1".padStart(1, " ");
        let estadoImpresionDocumento = "0".padStart(1, " ");
        let terceroCompradorDocumento = "1045425106".padEnd(15, " ");
        let terceroProveedorDocumento = "LSM660818M98".padEnd(1, " ");
        let sucursalProveedorDocumento = "001".padEnd(3, " ");
        let condicionPagoDocumento = "60D".padEnd(3, " ");
        let indicadorTasaDocumento = "1".padEnd(1, " ");
        let monedaDocumento = "USD".padEnd(3, " ");
        let monedaBaseConversionDocumento = "COP".padEnd(3, " ");
        let tasaConversionDocumento = "00000001.0000".padEnd(13, " ");
        let monedaLocalDocumento = "COP".padEnd(3, " ");
        let tasaLocalDocumento = tasaCambioDocumento.padEnd(13, " ");
        let descuentoGlobal1Documento = "000.0000".padEnd(8, " ");
        let descuentoGlobal2Documento = "000.0000".padEnd(8, " ");
        let notasDocumento = rows[0]["NOTAS"].padEnd(255, " ");
        let indicadorContactoDocumento = "1".padEnd(1, " ");
        let contactoDocumento = "".padEnd(50, " ");
        let direccion1Documento = "".padEnd(40, " ");
        let direccion2Documento = "".padEnd(40, " ");
        let paisDocumento = "".padEnd(3, " ");
        let departamentoDocumento = "".padEnd(2, " ");
        let ciudadDocumento = "".padEnd(3, " ");
        let barrioDocumento = "".padEnd(40, " ");
        let telefonoDocumento = "".padEnd(20, " ");
        let faxDocumento = "".padEnd(20, " ");
        let codigoPostalDocumento = "".padEnd(10, " ");
        let emailDocumento = "".padEnd(10, " ");
        let docReferenciaDocumento = rows[0]["Sales Order"].padEnd(10, " ");
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
            notasDocumento + indicadorContactoDocumento + contactoDocumento + direccion1Documento + direccion2Documento +
            paisDocumento + departamentoDocumento + ciudadDocumento + barrioDocumento + telefonoDocumento + faxDocumento +
            codigoPostalDocumento + emailDocumento + docReferenciaDocumento + mandatoDocumento +
            indicadorConsignacionDocumento + terceroSolicitanteDocumento;
        

        lines.push(encabezado);

        for (const row of rows) {

            consecutivo++;

            let numeroRegistroMovimiento = consecutivo.toString().padStart(7, "0");
            let tipoRegistroMovimiento = "0431".padStart(4, "0");
            let subTipoRegistroMovimiento = "0".padStart(2, "0");
            let versionTipoRegistroMovimiento = "01".padStart(2, "0");
            let companiaMovimiento = compania.padStart(3, "0");
            let centroOperacionM = centroOperativo.padStart(3, "0");
            let tipoDocumentoMovimiento = "PDF".padStart(3, "0");
            let consecutivoDocumentoMovimiento = contadorDetalle.toString().padStart(8, "0");
            let numeroRegistroMov = "1".toString().padStart(10, "0");/// REVISAR
            let itemMovimientoMovimiento = "0".padEnd(7, "0");
            let referenciaItemMovimiento = "".padEnd(50, " ");
            let codigoBarrasMovimiento = row["EAN del Ítem"].padStart(20, " ");
            let extension1Movimiento = "".padStart(20, " ");
            let extension2Movimiento = "".padStart(20, " ");
            let bodegaMovimiento = bodega.padStart(5, " ");
            let conceptoMovimiento = "501".padEnd(3, " ");
            let motivoMovimiento = "01".padEnd(2, " ");
            let indicadorObsequioMovimiento = "1".padEnd(1, " ");
            let centroOperacionMovimiento = "001".padStart(3, "0");
            let unidadNegocioMovimiento = "12".padStart(20, " ");
            let centroCostoMovimiento = "".padStart(15, " ");
            let proyectoMovimiento = "".padStart(15, " ");
            let fechaEntregaMovimiento = fecha.padStart(8, "0");
            let numeroDiasEntregaMovimiento = "0".padStart(3, "0");
            let listaPrecioMovimiento = "11".padEnd(3, " ");
            let unidadMedidaMovimiento = "UND".padEnd(4, " ");
            let cantidadBaseMovimiento = row["Cantidad Total"].toString().padStart(15, "0") + ".0000";
            let cantidadAdicionalMovimiento = "0".padStart(15, "0") + ".0000";
            let precioUnitarioMovimiento = "0".padStart(15, "0") + ".0000";
            let impuestosAsumidosMovimiento = "0".padStart(1, "0");
            let notasMovimiento = "INGRESADO POR PLANO".padEnd(255, " ");
            let descripcionMovimiento = "".padStart(2000, " ");
            let indicadorBackOrderMovimiento = "5".padStart(1, " ");
            let ultimoCampoMovimiento = "99".padEnd(20, " ")

            const linea = numeroRegistroMovimiento + tipoRegistroMovimiento + subTipoRegistroMovimiento + versionTipoRegistroMovimiento + companiaMovimiento + centroOperacionM + tipoDocumentoMovimiento + consecutivoDocumentoMovimiento + numeroRegistroMov + itemMovimientoMovimiento + referenciaItemMovimiento + codigoBarrasMovimiento + extension1Movimiento + extension2Movimiento + bodegaMovimiento + conceptoMovimiento + motivoMovimiento + indicadorObsequioMovimiento + centroOperacionMovimiento + unidadNegocioMovimiento + centroCostoMovimiento + proyectoMovimiento + fechaEntregaMovimiento + numeroDiasEntregaMovimiento + listaPrecioMovimiento + unidadMedidaMovimiento + cantidadBaseMovimiento + cantidadAdicionalMovimiento + precioUnitarioMovimiento + impuestosAsumidosMovimiento + notasMovimiento + descripcionMovimiento + indicadorBackOrderMovimiento;

            lines.push(linea);

        }

        contadorDetalle = contadorDetalle + 1;

    }

    // Final
    const numeroRegistroFinal = (consecutivo + 1).toString().padStart(7, "0");
    const tipoRegistroFinal = "9999";
    const subTipoRegistroFinal = "00";
    const versionTipoRegistroFinal = "01";
    const final = numeroRegistroFinal + tipoRegistroFinal + subTipoRegistroFinal + versionTipoRegistroFinal + compania
    lines.push(final);

    return lines.join("\n");
}