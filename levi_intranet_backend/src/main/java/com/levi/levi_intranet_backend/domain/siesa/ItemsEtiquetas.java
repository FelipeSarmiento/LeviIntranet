package com.levi.levi_intranet_backend.domain.siesa;

public class ItemsEtiquetas {

    private int id;
    private String referencia;
    private String descripcion;
    private String extension1;
    private String extension2;
    private String codigoBarra;
    private int rowId;
    private short idCia;
    private short idListaPrecio;
    private String precio;

    public ItemsEtiquetas() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getReferencia() { return referencia; }
    public void setReferencia(String referencia) { this.referencia = referencia.trim(); }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion.trim(); }

    public String getExtension1() { return extension1; }
    public void setExtension1(String extension1) { this.extension1 = extension1.trim(); }

    public String getExtension2() { return extension2; }
    public void setExtension2(String extension2) { this.extension2 = extension2.trim(); }

    public String getCodigoBarra() { return codigoBarra; }
    public void setCodigoBarra(String codigoBarra) { this.codigoBarra = codigoBarra.trim(); }

    public int getRowId() { return rowId; }
    public void setRowId(int rowId) { this.rowId = rowId; }

    public short getIdCia() { return idCia; }
    public void setIdCia(short idCia) { this.idCia = idCia; }
    public short getIdListaPrecio() { return idListaPrecio; }
    public void setIdListaPrecio(short idListaPrecio) { this.idListaPrecio = idListaPrecio; }
    public String getPrecio() { return precio; }
    public void setPrecio(String precio) { this.precio = precio; }


}
