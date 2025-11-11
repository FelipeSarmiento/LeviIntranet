package com.levi.levi_intranet_backend.domain.levis;

import jakarta.persistence.Id;

import java.util.Date;

public class Bonificaciones {

    private long empleado;
    private String periodo;
    private double valor;
    private Date fechaCaptura;
    private int centroCostos;
    private boolean generado;
    private String responsable;
    private String codigo;
    private String nombre;
    private String grupo;


    public long getEmpleado() {
        return empleado;
    }

    public void setEmpleado(long empleado) {
        this.empleado = empleado;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public Date getFechaCaptura() {
        return fechaCaptura;
    }

    public void setFechaCaptura(Date fechaCaptura) {
        this.fechaCaptura = fechaCaptura;
    }

    public int getCentroCostos() {
        return centroCostos;
    }

    public void setCentroCostos(int centroCostos) {
        this.centroCostos = centroCostos;
    }

    public boolean isGenerado() {
        return generado;
    }

    public void setGenerado(boolean generado) {
        this.generado = generado;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }


}
