"use client";

export function generateRequisicionesPlano(data, fechaISO, centroOperativo) {

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

    // Agrupar por BODEGA_SALIDA
    const pedidos = [...new Set(data.map((r) => r["BODEGA_SALIDA"]))];

    let consecutivo = 1;
    let contadorDetalle = 1;

    for (const bodega of pedidos) {
        consecutivo = consecutivo + 1;

        const rows = data.filter((r) => r["BODEGA_SALIDA"] === bodega);

        if (rows.length === 0) continue;

        let numeroRegistroDocumento = consecutivo.toString().padStart(7, "0");
        let tipoRegistroDocumento = "0440".padStart(4, "0");
        let subTipoRegistroDocumento = "0".padStart(2, "0");
        let versionTipoRegistroDocumento = "01".padStart(2, "0");
        let companiaDocumento = compania.padStart(3, "0");
        let consecutivoAutoManuDocumento = "1".padStart(1, "0");
        let centroOperacionDocumento = centroOperativo.padStart(3, "0");
        let tipoDocumento = "RQI".padStart(3, "0");
        let consecutivoDocumentoDocumento = contadorDetalle.toString().padStart(8, "0");
        let fechaDocumento = fecha.padStart(8, " ");
        let terceroDocumento = "".padStart(15, " ");
        let terceroSolicitanteDocumento = "SL01".padEnd(5, " ");
        let fechaEntregaDocumento = fecha.padEnd(8, " ");
        let numeroDiasEntregaDocumento = "1".padStart(3, " ");
        let claseDocumento = "075".padStart(3, " ");
        let estadoDocumento = "1".padStart(1, " ");
        let estadoImpresionDocumento = "".padStart(1, "0");
        let notasDocumento = "INGRESADO POR PLANO".padEnd(255, " ");
        let conceptoDocumento = "607".padEnd(3, " ");
        let bodegaSalidaDocumento = bodega.padStart(5, "0");
        let bodegaEntradaDocumento = rows[0]["BODEGA_ENTRADA"].padStart(5, "0");
        let documentoReferenciaDocumento = "".padStart(20, "0");

        const encabezado = numeroRegistroDocumento + tipoRegistroDocumento + subTipoRegistroDocumento + versionTipoRegistroDocumento + companiaDocumento + consecutivoAutoManuDocumento + centroOperacionDocumento + tipoDocumento + consecutivoDocumentoDocumento + fechaDocumento + terceroDocumento + terceroSolicitanteDocumento + fechaEntregaDocumento + numeroDiasEntregaDocumento + claseDocumento + estadoDocumento + estadoImpresionDocumento + notasDocumento + conceptoDocumento + bodegaSalidaDocumento + bodegaEntradaDocumento + documentoReferenciaDocumento;

        lines.push(encabezado);

        for (const row of rows) {

            consecutivo++;

            let numeroRegistroMovimiento = consecutivo.toString().padStart(7, "0");
            let tipoRegistroMovimiento = "0441".padStart(4, "0");
            let subTipoRegistroMovimiento = "0".padStart(2, "0");
            let versionTipoRegistroMovimiento = "02".padStart(2, "0");
            let companiaMovimiento = compania.padStart(3, "0");
            let centroOperacionM = centroOperativo.padStart(3, "0");
            let tipoDocumentoMovimiento = "RQI".padStart(3, "0");
            let consecutivoDocumentoMovimiento = contadorDetalle.toString().padStart(8, "0");
            let numeroRegistroMov = "1".toString().padStart(10, "0");
            let itemMovimientoMovimiento = "".padEnd(7, "0");
            let referenciaItemMovimiento = "".padEnd(50, " ");
            let codigoBarrasMovimiento = row["EAN                 "].padEnd(20, " ");
            let extension1Movimiento = "".padStart(20, " ");
            let extension2Movimiento = "".padStart(20, " ");
            let bodegaMovimiento = bodega.padStart(5, " ");
            let conceptoMovimiento = "607".padEnd(3, " ");
            let motivoMovimiento = "01".padEnd(2, " ");
            let unidadMedidaMovimiento = "UND".padEnd(4, " ");
            let cantidadBaseMovimiento = row["ventas_VMI"].toString().padStart(15, "0") + ".0000";
            let cantidadAdicionalMovimiento = "0".padStart(15, "0") + ".0000";
            let fechaEntregaMovimiento = fecha.padStart(8, "0");
            let numeroDiasEntregaMovimiento = "0".padStart(3, "0");
            let centroOperacionMovimiento = "001".padStart(3, "0");
            let unidadNegocioMovimiento = "".padStart(2, " ");
            let centroCostoMovimiento = "".padStart(15, " ");
            let proyectoMovimiento = "".padStart(15, " ");
            let notasMovimiento = "INGRESADO POR PLANO".padEnd(255, " ");
            let descripcionMovimiento = "".padStart(2000, " ");
            let ultimoCampoMovimiento = "99".padEnd(20, " ")

            const linea = numeroRegistroMovimiento + tipoRegistroMovimiento + subTipoRegistroMovimiento + versionTipoRegistroMovimiento + companiaMovimiento + centroOperacionM + tipoDocumentoMovimiento + consecutivoDocumentoMovimiento + numeroRegistroMov + itemMovimientoMovimiento + referenciaItemMovimiento + codigoBarrasMovimiento + extension1Movimiento + extension2Movimiento + bodegaMovimiento + conceptoMovimiento + motivoMovimiento + unidadMedidaMovimiento + cantidadBaseMovimiento + cantidadAdicionalMovimiento + fechaEntregaMovimiento + numeroDiasEntregaMovimiento + centroOperacionMovimiento + unidadNegocioMovimiento + centroCostoMovimiento + proyectoMovimiento + notasMovimiento + descripcionMovimiento + ultimoCampoMovimiento;

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
export function generateRequisicionesPedidoPlano(data, fechaISO, centroOperativo) {

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

    // Agrupar por BODEGA_SALIDA
    const pedidos = [...new Set(data.map((r) => r["NumeroPedido"]))];

    let consecutivo = 1;
    let contadorDetalle = 1;

    for (const bodega of pedidos) {
        consecutivo = consecutivo + 1;

        const rows = data.filter((r) => r["NumeroPedido"] === bodega);

        if (rows.length === 0) continue;

        let numeroRegistroDocumento = consecutivo.toString().padStart(7, "0");
        let tipoRegistroDocumento = "0440".padStart(4, "0");
        let subTipoRegistroDocumento = "0".padStart(2, "0");
        let versionTipoRegistroDocumento = "01".padStart(2, "0");
        let companiaDocumento = compania.padStart(3, "0");
        let consecutivoAutoManuDocumento = "1".padStart(1, "0");
        let centroOperacionDocumento = centroOperativo.padStart(3, "0");
        let tipoDocumento = "RQI".padStart(3, "0");
        let consecutivoDocumentoDocumento = contadorDetalle.toString().padStart(8, "0");
        let fechaDocumento = fecha.padStart(8, " ");
        let terceroDocumento = "".padStart(15, " ");
        let terceroSolicitanteDocumento = "SL01".padEnd(5, " ");
        let fechaEntregaDocumento = fecha.padEnd(8, " ");
        let numeroDiasEntregaDocumento = "1".padStart(3, " ");
        let claseDocumento = "075".padStart(3, " ");
        let estadoDocumento = "1".padStart(1, " ");
        let estadoImpresionDocumento = "0".padStart(1, "0");
        let notasDocumento = ("NRO_PEDIDO " + rows[0]["NumeroPedido"] + "  GUIA " + rows[0]["NumeroGuia"]).padEnd(255, " ");
        let conceptoDocumento = "607".padEnd(3, " ");
        let bodegaSalidaDocumento = "00072".padStart(5, "0");
        let bodegaEntradaDocumento = "00563".padStart(5, "0");
        let documentoReferenciaDocumento = rows[0]["NumeroPedido"].padStart(20, "0");

        const encabezado = numeroRegistroDocumento + tipoRegistroDocumento + subTipoRegistroDocumento + versionTipoRegistroDocumento + companiaDocumento + consecutivoAutoManuDocumento + centroOperacionDocumento + tipoDocumento + consecutivoDocumentoDocumento + fechaDocumento + terceroDocumento + terceroSolicitanteDocumento + fechaEntregaDocumento + numeroDiasEntregaDocumento + claseDocumento + estadoDocumento + estadoImpresionDocumento + notasDocumento + conceptoDocumento + bodegaSalidaDocumento + bodegaEntradaDocumento + documentoReferenciaDocumento;

        lines.push(encabezado);

        for (const row of rows) {

            consecutivo++;

            let numeroRegistroMovimiento = consecutivo.toString().padStart(7, "0");
            let tipoRegistroMovimiento = "0441".padStart(4, "0");
            let subTipoRegistroMovimiento = "0".padStart(2, "0");
            let versionTipoRegistroMovimiento = "02".padStart(2, "0");
            let companiaMovimiento = compania.padStart(3, "0");
            let centroOperacionM = centroOperativo.padStart(3, "0");
            let tipoDocumentoMovimiento = "RQI".padStart(3, "0");
            let consecutivoDocumentoMovimiento = contadorDetalle.toString().padStart(8, "0");
            let numeroRegistroMov = "1".toString().padStart(10, "0");
            let itemMovimientoMovimiento = "".padEnd(7, "0");
            let referenciaItemMovimiento = "".padEnd(50, " ");
            let codigoBarrasMovimiento = "".padEnd(20, " ");
            let extension1Movimiento = "".padStart(20, " ");
            let extension2Movimiento = "".padStart(20, " ");
            let bodegaMovimiento = "00072".padStart(5, " ");
            let conceptoMovimiento = "607".padEnd(3, " ");
            let motivoMovimiento = "01".padEnd(2, " ");
            let unidadMedidaMovimiento = "UND".padEnd(4, " ");
            let cantidadBaseMovimiento = row["CantidadComprada"].toString().padStart(15, "0") + ".0000";
            let cantidadAdicionalMovimiento = "0".padStart(15, "0") + ".0000";
            let fechaEntregaMovimiento = fecha.padStart(8, "0");
            let numeroDiasEntregaMovimiento = "0".padStart(3, "0");
            let centroOperacionMovimiento = "001".padStart(3, "0");
            let unidadNegocioMovimiento = "".padStart(2, " ");
            let centroCostoMovimiento = "".padStart(15, " ");
            let proyectoMovimiento = "".padStart(15, " ");
            let notasMovimiento = "INGRESADO POR PLANO".padEnd(255, " ");
            let descripcionMovimiento = "".padStart(2000, " ");
            let ultimoCampoMovimiento = "99".padEnd(20, " ")

            const linea = numeroRegistroMovimiento + tipoRegistroMovimiento + subTipoRegistroMovimiento + versionTipoRegistroMovimiento + companiaMovimiento + centroOperacionM + tipoDocumentoMovimiento + consecutivoDocumentoMovimiento + numeroRegistroMov + itemMovimientoMovimiento + referenciaItemMovimiento + codigoBarrasMovimiento + extension1Movimiento + extension2Movimiento + bodegaMovimiento + conceptoMovimiento + motivoMovimiento + unidadMedidaMovimiento + cantidadBaseMovimiento + cantidadAdicionalMovimiento + fechaEntregaMovimiento + numeroDiasEntregaMovimiento + centroOperacionMovimiento + unidadNegocioMovimiento + centroCostoMovimiento + proyectoMovimiento + notasMovimiento + descripcionMovimiento + ultimoCampoMovimiento;

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