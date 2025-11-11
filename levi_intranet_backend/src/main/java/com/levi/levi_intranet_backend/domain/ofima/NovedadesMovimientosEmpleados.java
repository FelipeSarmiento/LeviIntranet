package com.levi.levi_intranet_backend.domain.ofima;

import java.util.Date;

public class NovedadesMovimientosEmpleados {

    private int codigoCentroCostos;
    private String codigo;
    private String concepto;
    private int diasPago;
    private Date fechaInicio;
    private Date fechaFin;
    private Date fechaPago;
    private Date fechaIngreso;
    private Date fechaModificacion;
    private Date fechaLiquidacion;
    private String grupo;
    private String periodo;
    private String passwordIn;
    private String passwordMo;
    private String nota;
    private boolean integrado;
    private boolean nominaAbierta;
    private int numeroHoras;
    private double valorAnterior;
    private double valor;

    public int getCodigoCentroCostos() {
        return codigoCentroCostos;
    }

    public void setCodigoCentroCostos(int codigoCentroCostos) {
        this.codigoCentroCostos = codigoCentroCostos;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getConcepto() {
        return concepto;
    }

    public void setConcepto(String concepto) {
        this.concepto = concepto;
    }

    public int getDiasPago() {
        return diasPago;
    }

    public void setDiasPago(int diasPago) {
        this.diasPago = diasPago;
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

    public Date getFechaPago() {
        return fechaPago;
    }

    public void setFechaPago(Date fechaPago) {
        this.fechaPago = fechaPago;
    }

    public Date getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(Date fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Date getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(Date fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public Date getFechaLiquidacion() {
        return fechaLiquidacion;
    }

    public void setFechaLiquidacion(Date fechaLiquidacion) {
        this.fechaLiquidacion = fechaLiquidacion;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }
    public String getPeriodo() {
        return grupo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public double getValorAnterior() {
        return valorAnterior;
    }

    public void setValorAnterior(double valorAnterior) {
        this.valorAnterior = valorAnterior;
    }

    public String getPasswordIn() {
        return passwordIn;
    }

    public void setPasswordIn(String passwordIn) {
        this.passwordIn = passwordIn;
    }

    public String getPasswordMo() {
        return passwordMo;
    }

    public void setPasswordMo(String passwordMo) {
        this.passwordMo = passwordMo;
    }

    public String getNota() {
        return nota;
    }

    public void setNota(String nota) {
        this.nota = nota;
    }

    public boolean isIntegrado() {
        return integrado;
    }

    public void setIntegrado(boolean integrado) {
        this.integrado = integrado;
    }

    public boolean isNominaAbierta() {
        return nominaAbierta;
    }

    public void setNominaAbierta(boolean nominaAbierta) {
        this.nominaAbierta = nominaAbierta;
    }

    public int getNumeroHoras() {
        return numeroHoras;
    }

    public void setNumeroHoras(int numeroHoras) {
        this.numeroHoras = numeroHoras;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }


}
