package com.levi.levi_intranet_backend.domain.ofima;

import java.util.Date;

public class MovimientoEmpleado {

    private String codigoCentroCostos;
    private String codigoCTA;
    private String Credito;
    private String Descripcion;
    private String Detalle;
    private Date FechaMovimiento;
    private Date FechaReal;
    private Date FechaIngreso;
    private Date FechaModificacion;
    private String IdMovimiento;
    private String NIT;
    private String PasswordIn;
    private String PasswordMo;
    private String NIIF;
    private String Documento;

    public String getCodigoCentroCostos() {
        return codigoCentroCostos;
    }

    public void setCodigoCentroCostos(String codigoCentroCostos) {
        this.codigoCentroCostos = codigoCentroCostos;
    }

    public String getCodigoCTA() {
        return codigoCTA;
    }

    public void setCodigoCTA(String codigoCTA) {
        this.codigoCTA = codigoCTA;
    }

    public String getCredito() {
        return Credito;
    }

    public void setCredito(String credito) {
        Credito = credito;
    }

    public String getDescripcion() {
        return Descripcion;
    }

    public void setDescripcion(String descripcion) {
        Descripcion = descripcion;
    }

    public String getDetalle() {
        return Detalle;
    }

    public void setDetalle(String detalle) {
        Detalle = detalle;
    }

    public Date getFechaMovimiento() {
        return FechaMovimiento;
    }

    public void setFechaMovimiento(Date fechaMovimiento) {
        FechaMovimiento = fechaMovimiento;
    }

    public Date getFechaReal() {
        return FechaReal;
    }

    public void setFechaReal(Date fechaReal) {
        FechaReal = fechaReal;
    }

    public Date getFechaIngreso() {
        return FechaIngreso;
    }

    public void setFechaIngreso(Date fechaIngreso) {
        FechaIngreso = fechaIngreso;
    }

    public Date getFechaModificacion() {
        return FechaModificacion;
    }

    public void setFechaModificacion(Date fechaModificacion) {
        FechaModificacion = fechaModificacion;
    }

    public String getIdMovimiento() {
        return IdMovimiento;
    }

    public void setIdMovimiento(String idMovimiento) {
        IdMovimiento = idMovimiento;
    }

    public String getNIT() {
        return NIT;
    }

    public void setNIT(String NIT) {
        this.NIT = NIT;
    }

    public String getPasswordIn() {
        return PasswordIn;
    }

    public void setPasswordIn(String passwordIn) {
        PasswordIn = passwordIn;
    }

    public String getPasswordMo() {
        return PasswordMo;
    }

    public void setPasswordMo(String passwordMo) {
        PasswordMo = passwordMo;
    }

    public String getNIIF() {
        return NIIF;
    }

    public void setNIIF(String NIIF) {
        this.NIIF = NIIF;
    }

    public String getDocumento() {
        return Documento;
    }

    public void setDocumento(String documento) {
        Documento = documento;
    }


}
