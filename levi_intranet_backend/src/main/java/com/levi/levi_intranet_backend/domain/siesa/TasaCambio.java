package com.levi.levi_intranet_backend.domain.siesa;

import java.util.Date;

public class TasaCambio {

    private short compania;
    private String idTipoCambio ;
    private String idMoneda ;
    private Date fecha;
    private double tasa;

    public short getCompania() {
        return compania;
    }

    public void setCompania(short compania) {
        this.compania = compania;
    }

    public String getIdTipoCambio() {
        return idTipoCambio;
    }

    public void setIdTipoCambio(String idTipoCambio) {
        this.idTipoCambio = idTipoCambio;
    }

    public String getIdMoneda() {
        return idMoneda;
    }

    public void setIdMoneda(String idMoneda) {
        this.idMoneda = idMoneda;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public double getTasa() {
        return tasa;
    }

    public void setTasa(double tasa) {
        this.tasa = tasa;
    }
}
