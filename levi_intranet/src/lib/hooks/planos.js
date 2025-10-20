"use client";

export function generatePlanoJumbo(data, fechaISO, bodega, centroOperativo) {

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
    const pedidos = [...new Set(data.map((r) => r["SUCURSAL"]))];

    let consecutivo = 1;
    let contadorDetalle = 1;

    for (const sucursal of pedidos) {
        consecutivo = consecutivo + 1;

        const rows = data.filter((r) => r["SUCURSAL"] === sucursal);

        if (rows.length === 0) continue;

        let numeroRegistroDocumento = consecutivo.toString().padStart(7, "0");
        let tipoRegistroDocumento = "0430".padStart(4, "0");
        let subTipoRegistroDocumento = "0".padStart(2, "0");
        let versionTipoRegistroDocumento = "01".padStart(2, "0");
        let companiaDocumento = compania.padStart(3, "0");
        let liquidaImpuestoDocumento = "1".padStart(1, "0");
        let consecutivoAutoManuDocumento = "1".padStart(1, "0");
        let indicadorContactoDocumento = "1".padStart(1, "0");
        let centroOperacionDocumento = centroOperativo.padStart(3, "0");
        let tipoDocumento = "PDF".padStart(3, "0");
        let numeroDocumento = contadorDetalle.padStart(8, "0");
        let fechaDocumento = fecha.padStart(8, " ");
        let claseInternaDocumento = "502".padStart(3, " ");
        let estadoDocumento = "2".padStart(1, " ");
        let indicadorBackOrderDocumento = "0".padStart(1, " ");
        let terceroClienteFacturarDocumento = "900155107".padStart(15, " ");
        let sucursalClienteFacturarDocumento = rows[0]["sucursal"].padStart(3, " ");
        let terceroClienteDespacharDocumento = "900155107".padStart(15, " ");
        let sucursalClienteDespacharDocumento = rows[0]["sucursal"].padStart(3, " ");
        let tipoClienteDocumento = "1318".padStart(4, " ");
        let centroOperacionFacturaDocumento = "202".toString().padStart(3, "0");
        let fechaEntregaDocumento = rows[0]["F. Mínima Entrega"].padEnd(8, " ");
        let numeroDiasEntregaDocumento = "000".padStart(3, " ");
        let ordenCompraDocumento = rows[0]["OC"].padStart(15, " ");
        let referenciaDocumento = "".padStart(10, " ");
        let codigoCargueDocumento = "".padStart(10, " ");
        let codigoMonedaDocumento = "COP".padStart(3, " ");
        let monedaBaseDocumento = "COP".padStart(3, " ");
        let tasaConversionDocumento = "1".padStart(13, " ");
        let monedaLocalDocumento = "COP".padStart(3, " ");
        let tasaLocalDocumento = "1".padStart(13, " ");
        let condicionPagoDocumento = "75D".padStart(3, " ");
        let estadoImpresionDocumento = "0".padStart(1, "0");
        let notasDocumento = ("OC" + rows[0]["OC"]).padEnd(2000, " ");
        let clienteContactoDocumento = "".padEnd(15, " ");
        let puntoEnvioDocumento = "000".padEnd(3, " ");
        let vendedorPedidoDocumento = "79795084".padEnd(15, " ");
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

        const encabezado = numeroRegistroDocumento + tipoRegistroDocumento + subTipoRegistroDocumento + versionTipoRegistroDocumento + companiaDocumento + liquidaImpuestoDocumento + consecutivoAutoManuDocumento + indicadorContactoDocumento + centroOperacionDocumento + tipoDocumento + numeroDocumento + fechaDocumento + claseInternaDocumento + estadoDocumento + indicadorBackOrderDocumento + terceroClienteFacturarDocumento + sucursalClienteFacturarDocumento + terceroClienteDespacharDocumento + sucursalClienteDespacharDocumento + tipoClienteDocumento + centroOperacionFacturaDocumento + fechaEntregaDocumento + numeroDiasEntregaDocumento + ordenCompraDocumento + referenciaDocumento + codigoCargueDocumento + codigoMonedaDocumento + monedaBaseDocumento + tasaConversionDocumento + monedaLocalDocumento + tasaLocalDocumento + condicionPagoDocumento + estadoImpresionDocumento + notasDocumento + clienteContactoDocumento + puntoEnvioDocumento + vendedorPedidoDocumento + contactoDocumento + direccion1Documento + direccion2Documento + direccion3Documento + paisDocumento + departamentoDocumento + ciudadDocumento + barrioDocumento + telefonoDocumento + faxDocumento + codigoPostalDocumento + emailDocumento;

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
export function generatePlanoFalabella(data, fechaISO, bodega, centroOperativo) {

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
    const pedidos = [...new Set(data.map((r) => r["NRO_OC"]))];

    let consecutivo = 1;
    let contadorDetalle = 1;

    for (const pedido of pedidos) {
        consecutivo = consecutivo + 1;

        const rows = data.filter((r) => r["NRO_OC"] === pedido);

        if (rows.length === 0) continue;

        let numeroRegistroDocumento = consecutivo.toString().padStart(7, "0");
        let tipoRegistroDocumento = "0430".padStart(4, "0");
        let subTipoRegistroDocumento = "0".padStart(2, "0");
        let versionTipoRegistroDocumento = "01".padStart(2, "0");
        let companiaDocumento = compania.padStart(3, "0");
        let liquidaImpuestoDocumento = "1".padStart(1, "0");
        let consecutivoAutoManuDocumento = "1".padStart(1, "0");
        let indicadorContactoDocumento = "1".padStart(1, "0");
        let centroOperacionDocumento = centroOperativo.padStart(3, "0");
        let tipoDocumento = "PDF".padStart(3, "0");
        let numeroDocumento = contadorDetalle.padStart(8, "0");
        let fechaDocumento = fecha.padStart(8, " ");
        let claseInternaDocumento = "502".padStart(3, " ");
        let estadoDocumento = "2".padStart(1, " ");
        let indicadorBackOrderDocumento = "0".padStart(1, " ");
        let terceroClienteFacturarDocumento = "900017447".padStart(15, " ");
        let sucursalClienteFacturarDocumento = "002".padStart(3, " ");
        let terceroClienteDespacharDocumento = "900017447".padStart(15, " ");
        let sucursalClienteDespacharDocumento = "002".padStart(3, " ");
        let tipoClienteDocumento = "1318".padStart(4, " ");
        let centroOperacionFacturaDocumento = centroOperativo.toString().padStart(3, "0");
        let fechaEntregaDocumento = rows[0]["FECHA_DESDE"].padEnd(8, " ");
        let numeroDiasEntregaDocumento = "000".padStart(3, " ");
        let ordenCompraDocumento = rows[0]["OC"].padStart(15, " ");
        let referenciaDocumento = "".padStart(10, " ");
        let codigoCargueDocumento = "".padStart(10, " ");
        let codigoMonedaDocumento = "COP".padStart(3, " ");
        let monedaBaseDocumento = "COP".padStart(3, " ");
        let tasaConversionDocumento = "1".padStart(13, " ");
        let monedaLocalDocumento = "COP".padStart(3, " ");
        let tasaLocalDocumento = "1".padStart(13, " ");
        let condicionPagoDocumento = "60D".padStart(3, " ");
        let estadoImpresionDocumento = "0".padStart(1, "0");
        //////
        let notasDocumento = ("NRO_F12 " + rows[0]["NRO_F12"] + "  OC " + rows[0]["NRO_OC"]).trim().padEnd(2000, " ");
        let clienteContactoDocumento = "".padEnd(15, " ");
        let puntoEnvioDocumento = "000".padEnd(3, " ");
        let vendedorPedidoDocumento = "79795084".padEnd(15, " ");
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

        const encabezado = numeroRegistroDocumento + tipoRegistroDocumento + subTipoRegistroDocumento + versionTipoRegistroDocumento + companiaDocumento + liquidaImpuestoDocumento + consecutivoAutoManuDocumento + indicadorContactoDocumento + centroOperacionDocumento + tipoDocumento + numeroDocumento + fechaDocumento + claseInternaDocumento + estadoDocumento + indicadorBackOrderDocumento + terceroClienteFacturarDocumento + sucursalClienteFacturarDocumento + terceroClienteDespacharDocumento + sucursalClienteDespacharDocumento + tipoClienteDocumento + centroOperacionFacturaDocumento + fechaEntregaDocumento + numeroDiasEntregaDocumento + ordenCompraDocumento + referenciaDocumento + codigoCargueDocumento + codigoMonedaDocumento + monedaBaseDocumento + tasaConversionDocumento + monedaLocalDocumento + tasaLocalDocumento + condicionPagoDocumento + estadoImpresionDocumento + notasDocumento + clienteContactoDocumento + puntoEnvioDocumento + vendedorPedidoDocumento + contactoDocumento + direccion1Documento + direccion2Documento + direccion3Documento + paisDocumento + departamentoDocumento + ciudadDocumento + barrioDocumento + telefonoDocumento + faxDocumento + codigoPostalDocumento + emailDocumento;

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
            let codigoBarrasMovimiento = row["UPC"].padStart(20, " ");
            let extension1Movimiento = "".padStart(20, " ");
            let extension2Movimiento = "".padStart(20, " ");
            let bodegaMovimiento = bodega.padStart(5, " ");
            let conceptoMovimiento = "501".padEnd(3, " ");
            let motivoMovimiento = "01".padEnd(2, " ");
            let indicadorObsequioMovimiento = "0".padEnd(1, " ");
            let centroOperacionMovimiento = centroOperativo.padStart(3, "0");
            let unidadNegocioMovimiento = "12".padStart(20, " ");
            let centroCostoMovimiento = "".padStart(15, " ");
            let proyectoMovimiento = "".padStart(15, " ");
            let fechaEntregaMovimiento = fecha.padStart(8, "0");
            let numeroDiasEntregaMovimiento = "020".padStart(3, "0");
            let listaPrecioMovimiento = "11".padEnd(3, " ");
            let unidadMedidaMovimiento = "UND".padEnd(4, " ");
            let cantidadBaseMovimiento = row["UNIDADES"].toString().padStart(15, "0") + ".0000";
            let cantidadAdicionalMovimiento = "0".padStart(15, "0") + ".0000";
            let precioUnitarioMovimiento = row["PRECIO COSTO"].toString().trim().padStart(15, "0") + ".0000";
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
export function generatePlanoConsignaciones(data, fechaISO, centroOperativo) {

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
    const pedidos = [...new Set(data.map((r) => r["BODEGA "]))];

    let consecutivo = 1;
    let contadorDetalle = 1;

    for (const bodega of pedidos) {
        consecutivo = consecutivo + 1;

        const rows = data.filter((r) => r["BODEGA "] === bodega);

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
        let notasDocumento = ("OC " + rows[0]["OC"]).padEnd(255, " ");
        let conceptoDocumento = "607".padEnd(3, " ");
        let bodegaSalidaDocumento = "00072".padStart(5, "0");
        let bodegaEntradaDocumento = rows[0]["BODEGA "].padStart(5, "0");
        let documentoReferenciaDocumento = rows[0]["OC"].padStart(20, "0");

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
            let codigoBarrasMovimiento = row["EAN del Ítem"].padEnd(20, " ");
            let extension1Movimiento = "".padStart(20, " ");
            let extension2Movimiento = "".padStart(20, " ");
            let bodegaMovimiento = "00072".padStart(5, " ");
            let conceptoMovimiento = "607".padEnd(3, " ");
            let motivoMovimiento = "01".padEnd(2, " ");
            let unidadMedidaMovimiento = "UND".padEnd(4, " ");
            let cantidadBaseMovimiento = row["Cantidad Total"].toString().padStart(15, "0") + ".0000";
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

export function generatePlanoFacturacionVMI(data, fechaISO, centroOperativo) {

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
    const pedidos = [...new Set(data.map((r) => r["OC"]))];

    let consecutivo = 1;
    let contadorDetalle = 1;

    for (const pedido of pedidos) {
        consecutivo = consecutivo + 1;

        const rows = data.filter((r) => r["OC"] === pedido);

        if (rows.length === 0) continue;

        let numeroRegistroDocumento = consecutivo.toString().padStart(7, "0");
        let tipoRegistroDocumento = "0430".padStart(4, "0");
        let subTipoRegistroDocumento = "0".padStart(2, "0");
        let versionTipoRegistroDocumento = "01".padStart(2, "0");
        let companiaDocumento = compania.padStart(3, "0");
        let liquidaImpuestoDocumento = "1".padStart(1, "0");
        let consecutivoAutoManuDocumento = "1".padStart(1, "0");
        let indicadorContactoDocumento = "1".padStart(1, "0");
        let centroOperacionDocumento = centroOperativo.padStart(3, "0");
        let tipoDocumento = "PDF".padStart(3, "0");
        let numeroDocumento = String(contadorDetalle).padStart(8, "0");
        let fechaDocumento = fecha.padStart(8, " ");
        let claseInternaDocumento = "502".padStart(3, " ");
        let estadoDocumento = "2".padStart(1, " ");
        let indicadorBackOrderDocumento = "0".padStart(1, " ");
        let terceroClienteFacturarDocumento = "900155107".padStart(15, " ");
        let sucursalClienteFacturarDocumento = rows[0]["sucursal"].padStart(3, " ");
        let terceroClienteDespacharDocumento = "900155107".padStart(15, " ");
        let sucursalClienteDespacharDocumento = rows[0]["sucursal"].padStart(3, " ");
        let tipoClienteDocumento = "1318".padStart(4, " ");
        let centroOperacionFacturaDocumento = centroOperativo.toString().padStart(3, "0");
        let fechaEntregaDocumento = rows[0]["F. Mínima Entrega"].padEnd(8, " ");
        let numeroDiasEntregaDocumento = "000".padStart(3, " ");
        let ordenCompraDocumento = rows[0]["OC"].padStart(15, " ");
        let referenciaDocumento = "".padStart(10, " ");
        let codigoCargueDocumento = "".padStart(10, " ");
        let codigoMonedaDocumento = "COP".padStart(3, " ");
        let monedaBaseDocumento = "COP".padStart(3, " ");
        let tasaConversionDocumento = "1".padStart(13, " ");
        let monedaLocalDocumento = "COP".padStart(3, " ");
        let tasaLocalDocumento = "1".padStart(13, " ");
        let condicionPagoDocumento = "75D".padStart(3, " ");
        let estadoImpresionDocumento = "0".padStart(1, "0");
        let notasDocumento = ("OC " + rows[0]["OC"]).trim().padEnd(2000, " ");
        let clienteContactoDocumento = "".padEnd(15, " ");
        let puntoEnvioDocumento = "000".padEnd(3, " ");
        let vendedorPedidoDocumento = "79795084".padEnd(15, " ");
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

        const encabezado = numeroRegistroDocumento + tipoRegistroDocumento + subTipoRegistroDocumento + versionTipoRegistroDocumento + companiaDocumento + liquidaImpuestoDocumento + consecutivoAutoManuDocumento + indicadorContactoDocumento + centroOperacionDocumento + tipoDocumento + numeroDocumento + fechaDocumento + claseInternaDocumento + estadoDocumento + indicadorBackOrderDocumento + terceroClienteFacturarDocumento + sucursalClienteFacturarDocumento + terceroClienteDespacharDocumento + sucursalClienteDespacharDocumento + tipoClienteDocumento + centroOperacionFacturaDocumento + fechaEntregaDocumento + numeroDiasEntregaDocumento + ordenCompraDocumento + referenciaDocumento + codigoCargueDocumento + codigoMonedaDocumento + monedaBaseDocumento + tasaConversionDocumento + monedaLocalDocumento + tasaLocalDocumento + condicionPagoDocumento + estadoImpresionDocumento + notasDocumento + clienteContactoDocumento + puntoEnvioDocumento + vendedorPedidoDocumento + contactoDocumento + direccion1Documento + direccion2Documento + direccion3Documento + paisDocumento + departamentoDocumento + ciudadDocumento + barrioDocumento + telefonoDocumento + faxDocumento + codigoPostalDocumento + emailDocumento;

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
            let bodegaMovimiento = row["BODEGA "].padStart(5, " ");
            let conceptoMovimiento = "501".padEnd(3, " ");
            let motivoMovimiento = "01".padEnd(2, " ");
            let indicadorObsequioMovimiento = "0".padEnd(1, " ");
            let centroOperacionMovimiento = centroOperativo.padStart(3, "0");
            let unidadNegocioMovimiento = "12".padStart(20, " ");
            let centroCostoMovimiento = "".padStart(15, " ");
            let proyectoMovimiento = "".padStart(15, " ");
            let fechaEntregaMovimiento = row["F. Mínima Entrega"].padStart(8, "0");
            let numeroDiasEntregaMovimiento = "000".padStart(3, "0");
            let listaPrecioMovimiento = "11".padEnd(3, " ");
            let unidadMedidaMovimiento = "UND".padEnd(4, " ");
            let cantidadBaseMovimiento = row["Cantidad Total"].toString().padStart(15, "0") + ".0000";
            let cantidadAdicionalMovimiento = "0".padStart(15, "0") + ".0000";
            let precioUnitarioMovimiento = row["Precio Neto"].toString().trim().padStart(15, "0") + ".0000";
            let impuestosAsumidosMovimiento = "0".padStart(1, "0");
            let notasMovimiento = "INGRESADO POR PLANO".padEnd(255, " ");
            let descripcionMovimiento = "".padStart(2000, " ");
            let indicadorBackOrderMovimiento = "5".padStart(1, " ");

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