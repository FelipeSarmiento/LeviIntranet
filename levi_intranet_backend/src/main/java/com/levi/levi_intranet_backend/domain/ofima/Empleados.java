package com.levi.levi_intranet_backend.domain.ofima;

import java.util.Date;

public class Empleados {

    private String cedula;
    private String codigo;
    private String nombre;
    private Date fechaContrato;
    private Date fechaRetiro;
    private Date prorrogaUno;
    private Date prorrogaDos;
    private Date prorrogaTres;
    private String empresa;
    private String codigoCentroCostos;
    private String nombreCentroCostos;
    private String duracionContrato;
    private String salarioIntegral;
    private String salarioFijo;
    private String valorSalario;
    private String valorSalarioLetras;
    private String cargo;
    private String tipoContrato;
    private String primerApellido;
    private String segundoApellido;
    private String primerNombre;
    private String segundoNombre;
    private String email;
    private String grupo;
    private double activo;

    public Date getProrrogaUno() {
        return prorrogaUno;
    }
    public void setProrrogaUno(Date prorrogaUno) {
        this.prorrogaUno = prorrogaUno;
    }
    public Date getProrrogaDos() {
        return prorrogaDos;
    }
    public void setProrrogaDos(Date prorrogaDos) {
        this.prorrogaDos = prorrogaDos;
    }
    public Date getProrrogaTres() {
        return prorrogaTres;
    }
    public void setProrrogaTres(Date prorrogaTres) {
        this.prorrogaTres = prorrogaTres;
    }
    public String getCodigoCentroCostos() {
        return codigoCentroCostos;
    }
    public void setCodigoCentroCostos(String codigoCentroCostos) {
        this.codigoCentroCostos = codigoCentroCostos;
    }
    public String getNombreCentroCostos() {
        return nombreCentroCostos;
    }
    public void setNombreCentroCostos(String nombreCentroCostos) {
        this.nombreCentroCostos = nombreCentroCostos;
    }
    public String getDuracionContrato() {
        return duracionContrato;
    }
    public void setDuracionContrato(String duracionContrato) {
        this.duracionContrato = duracionContrato;
    }
    public String getCedula() {
        return cedula;
    }
    public void setCedula(String cedula) {
        this.cedula = cedula;
    }
    public String getCodigo() {
        return codigo;
    }
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    public String getGrupo() {
        return grupo;
    }
    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public Date getFechaContrato() {
        return fechaContrato;
    }
    public void setFechaContrato(Date fechaContrato) {
        this.fechaContrato = fechaContrato;
    }
    public Date getFechaRetiro() {
        return fechaRetiro;
    }
    public void setFechaRetiro(Date fechaRetiro) {
        this.fechaRetiro = fechaRetiro;
    }
    public String getEmpresa() {
        return empresa;
    }
    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }
    public String getSalarioIntegral() {
        return salarioIntegral;
    }
    public void setSalarioIntegral(String salarioIntegral) {
        this.salarioIntegral = salarioIntegral;
    }
    public String getSalarioFijo() {
        return salarioFijo;
    }
    public void setSalarioFijo(String salarioFijo) {
        this.salarioFijo = salarioFijo;
    }
    public String getValorSalario() {
        return valorSalario;
    }
    public void setValorSalario(String valorSalario) {
        this.valorSalario = valorSalario;
    }
    public String getValorSalarioLetras() {
        return valorSalarioLetras;
    }
    public void setValorSalarioLetras(String valorSalarioLetras) {
        this.valorSalarioLetras = valorSalarioLetras;
    }
    public String getCargo() {
        return cargo;
    }
    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
    public String getTipoContrato() {
        return tipoContrato;
    }
    public void setTipoContrato(String tipoContrato) {
        this.tipoContrato = tipoContrato;
    }
    public String getPrimerApellido() {
        return primerApellido;
    }
    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }
    public String getSegundoApellido() {
        return segundoApellido;
    }
    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }
    public String getPrimerNombre() {
        return primerNombre;
    }
    public void setPrimerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
    }
    public String getSegundoNombre() {
        return segundoNombre;
    }
    public void setSegundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public double getActivo() {
        return activo;
    }
    public void setActivo(double activo) {
        this.activo = activo;
    }
}
