package com.levi.levi_intranet_backend.domain.siesa;

public class TipoInventarios {

    private String idTipoInventario;
    private String descripcion;

    public TipoInventarios() {}

    public String getIdTipoInventario() { return idTipoInventario; }
    public void setIdTipoInventario(String idTipoInventario) { this.idTipoInventario = idTipoInventario.trim(); }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion.trim(); }

}
