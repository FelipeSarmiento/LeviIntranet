package com.levi.levi_intranet_backend.domain.siesa;

public class ListaPrecios {

    private String id;
    private String descripcion;

    public ListaPrecios() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion.trim(); }

}
