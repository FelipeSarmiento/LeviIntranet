package com.levi.levi_intranet_backend.domain.levis;

import jakarta.persistence.Id;

import java.util.Date;

public class Quincenas {

    @Id
    private String anio;
    private String quincenaNum;
    private String quincena;
    private Date fechaInicio;
    private Date fechaFin;

    public String getAnio() {
        return anio;
    }
    public void setAnio(String anio) {
        this.anio = anio;
    }
    public String getQuincenaNum() {
        return quincenaNum;
    }
    public void setQuincenaNum(String quincenaNum) {
        this.quincenaNum = quincenaNum;
    }
    public String getQuincena() {
        return quincena;
    }
    public void setQuincena(String quincena) {
        this.quincena = quincena;
    }
    public Date getFechaInicio() {
        return fechaInicio;
    }
    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
    public Date getFechaFin() {
        return fechaFin;
    }
    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

}
