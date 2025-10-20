package com.levi.levi_intranet_backend.domain.siesa;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

public class CentroCostosSiesa {

    private String idCentroCosto;
    private String centroCosto;
    private String descripcion;

    public CentroCostosSiesa() {}

    public String getDescripcion(){
        return descripcion;
    }
    public void setDescripcion(String descripcion){
        this.descripcion = descripcion;
    }
    public String getIdCentroCosto() {
        return idCentroCosto;
    }
    public void setIdCentroCosto(String idCentroCosto) {
        this.idCentroCosto = idCentroCosto;
    }
    public String getCentroCosto() {
        return centroCosto;
    }
    public void setCentroCosto(String centroCosto) {
        this.centroCosto = centroCosto;
    }



}
