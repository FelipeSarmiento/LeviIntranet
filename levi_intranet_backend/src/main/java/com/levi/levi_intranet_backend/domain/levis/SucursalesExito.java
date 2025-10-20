package com.levi.levi_intranet_backend.domain.levis;

import jakarta.persistence.Id;

public class SucursalesExito {

    @Id
    public int id;
    public String descripcion;
    public String idExito;
    public String idUnoee;
    public String idCC;
    public String idBodega;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public String getIdExito() {
        return idExito;
    }
    public void setIdExito(String idExito) {
        this.idExito = idExito;
    }
    public String getIdUnoee() {
        return idUnoee;
    }
    public void setIdUnoee(String idUnoee) {
        this.idUnoee = idUnoee;
    }
    public String getIdCC() {
        return idCC;
    }
    public void setIdCC(String idCC) {
        this.idCC = idCC;
    }
    public String getIdBodega() {
        return idBodega;
    }
    public void setIdBodega(String idBodega) {
        this.idBodega = idBodega;
    }
}
