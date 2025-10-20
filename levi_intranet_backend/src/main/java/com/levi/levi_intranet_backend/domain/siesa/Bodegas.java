package com.levi.levi_intranet_backend.domain.siesa;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "t120_mc_items")
public class Bodegas {

    private short idCia;
    @Id
    private int rowId;
    private String id;
    private String descripcion;
    private String descripcionCorta;
    private String idCo;
    private String idInstalacion;
    private int rowIdContacto;
    private short indEstado;
    private short indCntrlExistencia;
    private short indMultiUbicacion;
    private short indLotes;
    private short indCostos;
    private short indFacturable;
    private short indConsiderableMrp;
    private String notas;
    private String idInstalacionBaseMrp;
    private short idCiaBaseMrp;
    private short indConsigDada;
    private short indExclusivoPdv;
    private short indCntrlDisponibilidad;
    private int rowIdMovtoEntidad;
    private String idBd;
    private String identificacionMac;
    private String idPortafolioInv;
    private short indUmPortafolioInv;
    private int rowIdCentroCostos;
    private short indConsigRecibida;
    private int rowIdBodegaPropia;

    public Bodegas() {}

    public short getIdCia() { return idCia; }
    public int getRowId() { return rowId; }
    public String getId() { return id; }
    public String getDescripcion() { return descripcion; }
    public String getDescripcionCorta() { return descripcionCorta; }
    public String getIdCo() { return idCo; }
    public String getIdInstalacion() { return idInstalacion; }
    public int getRowIdContacto() { return rowIdContacto; }
    public short getIndEstado() { return indEstado; }
    public short getIndCntrlExistencia() { return indCntrlExistencia; }
    public short getIndMultiUbicacion() { return indMultiUbicacion; }
    public short getIndLotes() { return indLotes; }
    public short getIndCostos() { return indCostos; }
    public short getIndFacturable() { return indFacturable; }
    public short getIndConsiderableMrp() { return indConsiderableMrp; }
    public String getNotas() { return notas; }
    public String getIdInstalacionBaseMrp() { return idInstalacionBaseMrp; }
    public short getIdCiaBaseMrp() { return idCiaBaseMrp; }
    public short getIndConsigDada() { return indConsigDada; }
    public short getIndExclusivoPdv() { return indExclusivoPdv; }
    public short getIndCntrlDisponibilidad() { return indCntrlDisponibilidad; }
    public int getRowIdMovtoEntidad() { return rowIdMovtoEntidad; }
    public String getIdBd() { return idBd; }
    public String getIdentificacionMac() { return identificacionMac; }
    public String getIdPortafolioInv() { return idPortafolioInv; }
    public short getIndUmPortafolioInv() { return indUmPortafolioInv; }
    public int getRowIdCentroCostos() { return rowIdCentroCostos; }
    public short getIndConsigRecibida() { return indConsigRecibida; }
    public int getRowIdBodegaPropia() { return rowIdBodegaPropia; }

    public void setIdCia(short idCia) { this.idCia = idCia; }
    public void setRowId(int rowId) { this.rowId = rowId; }
    public void setId(String id) { this.id = id; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public void setDescripcionCorta(String descripcionCorta) { this.descripcionCorta = descripcionCorta; }
    public void setIdCo(String idCo) { this.idCo = idCo; }
    public void setIdInstalacion(String idInstalacion) { this.idInstalacion = idInstalacion; }
    public void setRowIdContacto(int rowIdContacto) { this.rowIdContacto = rowIdContacto; }
    public void setIndEstado(short indEstado) { this.indEstado = indEstado; }
    public void setIndCntrlExistencia(short indCntrlExistencia) { this.indCntrlExistencia = indCntrlExistencia; }
    public void setIndMultiUbicacion(short indMultiUbicacion) { this.indMultiUbicacion = indMultiUbicacion; }
    public void setIndLotes(short indLotes) { this.indLotes = indLotes; }
    public void setIndCostos(short indCostos) { this.indCostos = indCostos; }
    public void setIndFacturable(short indFacturable) { this.indFacturable = indFacturable; }
    public void setIndConsiderableMrp(short indConsiderableMrp) { this.indConsiderableMrp = indConsiderableMrp; }
    public void setNotas(String notas) { this.notas = notas; }
    public void setIdInstalacionBaseMrp(String idInstalacionBaseMrp) { this.idInstalacionBaseMrp = idInstalacionBaseMrp; }
    public void setIdCiaBaseMrp(short idCiaBaseMrp) { this.idCiaBaseMrp = idCiaBaseMrp; }
    public void setIndConsigDada(short indConsigDada) { this.indConsigDada = indConsigDada; }
    public void setIndExclusivoPdv(short indExclusivoPdv) { this.indExclusivoPdv = indExclusivoPdv; }
    public void setIndCntrlDisponibilidad(short indCntrlDisponibilidad) { this.indCntrlDisponibilidad = indCntrlDisponibilidad; }
    public void setRowIdMovtoEntidad(int rowIdMovtoEntidad) { this.rowIdMovtoEntidad = rowIdMovtoEntidad; }
    public void setIdBd(String idBd) { this.idBd = idBd; }
    public void setIdentificacionMac(String identificacionMac) { this.identificacionMac = identificacionMac; }
    public void setIdPortafolioInv(String idPortafolioInv) { this.idPortafolioInv = idPortafolioInv; }
    public void setIndUmPortafolioInv(short indUmPortafolioInv) { this.indUmPortafolioInv = indUmPortafolioInv; }
    public void setRowIdCentroCostos(int rowIdCentroCostos) { this.rowIdCentroCostos = rowIdCentroCostos; }
    public void setIndConsigRecibida(short indConsigRecibida) { this.indConsigRecibida = indConsigRecibida; }
    public void setRowIdBodegaPropia(int rowIdBodegaPropia) { this.rowIdBodegaPropia = rowIdBodegaPropia; }



}
