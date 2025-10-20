package com.levi.levi_intranet_backend.domain.siesa;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "t120_mc_items")
public class Items {

    private short idCia;
    private int id;

    @Id
    private int rowId;

    private String referencia;
    private String descripcion;
    private String descripcionCorta;
    private String idGrupoImpositivo;
    private String idTipoInvServ;
    private String idGrupoDscto;
    private short indTipoItem;
    private short indCompra;
    private short indVenta;
    private short indManufactura;
    private short indListaPreciosExt;
    private short indLote;
    private short indLoteAsignacion;
    private short indSobrecostos;
    private short vidaUtil;
    private int rowIdTerceroProv;
    private String idSucursalProv;
    private int rowIdTerceroCli;
    private String idSucursalCli;
    private String idUnidadInventario;
    private String idUnidadAdicional;
    private String idUnidadOrden;
    private String idUnidadEmpaque;
    private String idDescripcionTecnica;
    private String idExtension1;
    private String idExtension2;
    private int rowIdFoto;
    private String notas;
    private short idSegmentoCosto;
    private String usuarioCreacion;
    private String usuarioActualizacion;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCreacion;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaActualizacion;

    private short indSerial;
    private String indCfgSerial;
    private short indPaquete;
    private int rowIdMovtoEntidad;
    private short indExento;
    private short indVentaInterno;
    private short indGenerico;
    private short indGumUnificado;
    private String idUnidadPrecio;
    private short indControlado;

    public Items() {}

    public short getIdCia() { return idCia; }
    public void setIdCia(short idCia) { this.idCia = idCia; }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getRowId() { return rowId; }
    public void setRowId(int rowId) { this.rowId = rowId; }

    public String getReferencia() { return referencia; }
    public void setReferencia(String referencia) { this.referencia = referencia; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getDescripcionCorta() { return descripcionCorta; }
    public void setDescripcionCorta(String descripcionCorta) { this.descripcionCorta = descripcionCorta; }

    public String getIdGrupoImpositivo() { return idGrupoImpositivo; }
    public void setIdGrupoImpositivo(String idGrupoImpositivo) { this.idGrupoImpositivo = idGrupoImpositivo; }

    public String getIdTipoInvServ() { return idTipoInvServ; }
    public void setIdTipoInvServ(String idTipoInvServ) { this.idTipoInvServ = idTipoInvServ; }

    public String getIdGrupoDscto() { return idGrupoDscto; }
    public void setIdGrupoDscto(String idGrupoDscto) { this.idGrupoDscto = idGrupoDscto; }

    public short getIndTipoItem() { return indTipoItem; }
    public void setIndTipoItem(short indTipoItem) { this.indTipoItem = indTipoItem; }

    public short getIndCompra() { return indCompra; }
    public void setIndCompra(short indCompra) { this.indCompra = indCompra; }

    public short getIndVenta() { return indVenta; }
    public void setIndVenta(short indVenta) { this.indVenta = indVenta; }

    public short getIndManufactura() { return indManufactura; }
    public void setIndManufactura(short indManufactura) { this.indManufactura = indManufactura; }

    public short getIndListaPreciosExt() { return indListaPreciosExt; }
    public void setIndListaPreciosExt(short indListaPreciosExt) { this.indListaPreciosExt = indListaPreciosExt; }

    public short getIndLote() { return indLote; }
    public void setIndLote(short indLote) { this.indLote = indLote; }

    public short getIndLoteAsignacion() { return indLoteAsignacion; }
    public void setIndLoteAsignacion(short indLoteAsignacion) { this.indLoteAsignacion = indLoteAsignacion; }

    public short getIndSobrecostos() { return indSobrecostos; }
    public void setIndSobrecostos(short indSobrecostos) { this.indSobrecostos = indSobrecostos; }

    public short getVidaUtil() { return vidaUtil; }
    public void setVidaUtil(short vidaUtil) { this.vidaUtil = vidaUtil; }

    public int getRowIdTerceroProv() { return rowIdTerceroProv; }
    public void setRowIdTerceroProv(int rowIdTerceroProv) { this.rowIdTerceroProv = rowIdTerceroProv; }

    public String getIdSucursalProv() { return idSucursalProv; }
    public void setIdSucursalProv(String idSucursalProv) { this.idSucursalProv = idSucursalProv; }

    public int getRowIdTerceroCli() { return rowIdTerceroCli; }
    public void setRowIdTerceroCli(int rowIdTerceroCli) { this.rowIdTerceroCli = rowIdTerceroCli; }

    public String getIdSucursalCli() { return idSucursalCli; }
    public void setIdSucursalCli(String idSucursalCli) { this.idSucursalCli = idSucursalCli; }

    public String getIdUnidadInventario() { return idUnidadInventario; }
    public void setIdUnidadInventario(String idUnidadInventario) { this.idUnidadInventario = idUnidadInventario; }

    public String getIdUnidadAdicional() { return idUnidadAdicional; }
    public void setIdUnidadAdicional(String idUnidadAdicional) { this.idUnidadAdicional = idUnidadAdicional; }

    public String getIdUnidadOrden() { return idUnidadOrden; }
    public void setIdUnidadOrden(String idUnidadOrden) { this.idUnidadOrden = idUnidadOrden; }

    public String getIdUnidadEmpaque() { return idUnidadEmpaque; }
    public void setIdUnidadEmpaque(String idUnidadEmpaque) { this.idUnidadEmpaque = idUnidadEmpaque; }

    public String getIdDescripcionTecnica() { return idDescripcionTecnica; }
    public void setIdDescripcionTecnica(String idDescripcionTecnica) { this.idDescripcionTecnica = idDescripcionTecnica; }

    public String getIdExtension1() { return idExtension1; }
    public void setIdExtension1(String idExtension1) { this.idExtension1 = idExtension1; }

    public String getIdExtension2() { return idExtension2; }
    public void setIdExtension2(String idExtension2) { this.idExtension2 = idExtension2; }

    public int getRowIdFoto() { return rowIdFoto; }
    public void setRowIdFoto(int rowIdFoto) { this.rowIdFoto = rowIdFoto; }

    public String getNotas() { return notas; }
    public void setNotas(String notas) { this.notas = notas; }

    public short getIdSegmentoCosto() { return idSegmentoCosto; }
    public void setIdSegmentoCosto(short idSegmentoCosto) { this.idSegmentoCosto = idSegmentoCosto; }

    public String getUsuarioCreacion() { return usuarioCreacion; }
    public void setUsuarioCreacion(String usuarioCreacion) { this.usuarioCreacion = usuarioCreacion; }

    public String getUsuarioActualizacion() { return usuarioActualizacion; }
    public void setUsuarioActualizacion(String usuarioActualizacion) { this.usuarioActualizacion = usuarioActualizacion; }

    public Date getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(Date fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public Date getFechaActualizacion() { return fechaActualizacion; }
    public void setFechaActualizacion(Date fechaActualizacion) { this.fechaActualizacion = fechaActualizacion; }

    public short getIndSerial() { return indSerial; }
    public void setIndSerial(short indSerial) { this.indSerial = indSerial; }

    public String getIndCfgSerial() { return indCfgSerial; }
    public void setIndCfgSerial(String indCfgSerial) { this.indCfgSerial = indCfgSerial; }

    public short getIndPaquete() { return indPaquete; }
    public void setIndPaquete(short indPaquete) { this.indPaquete = indPaquete; }

    public int getRowIdMovtoEntidad() { return rowIdMovtoEntidad; }
    public void setRowIdMovtoEntidad(int rowIdMovtoEntidad) { this.rowIdMovtoEntidad = rowIdMovtoEntidad; }

    public short getIndExento() { return indExento; }
    public void setIndExento(short indExento) { this.indExento = indExento; }

    public short getIndVentaInterno() { return indVentaInterno; }
    public void setIndVentaInterno(short indVentaInterno) { this.indVentaInterno = indVentaInterno; }

    public short getIndGenerico() { return indGenerico; }
    public void setIndGenerico(short indGenerico) { this.indGenerico = indGenerico; }

    public short getIndGumUnificado() { return indGumUnificado; }
    public void setIndGumUnificado(short indGumUnificado) { this.indGumUnificado = indGumUnificado; }

    public String getIdUnidadPrecio() { return idUnidadPrecio; }
    public void setIdUnidadPrecio(String idUnidadPrecio) { this.idUnidadPrecio = idUnidadPrecio; }

    public short getIndControlado() { return indControlado; }
    public void setIndControlado(short indControlado) { this.indControlado = indControlado; }
}

