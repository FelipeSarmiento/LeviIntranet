package com.levi.levi_intranet_backend.application.levis;

import com.levi.levi_intranet_backend.api.levis.dto.BonificacionesDtos;
import com.levi.levi_intranet_backend.application.ofima.EmpleadosService;
import com.levi.levi_intranet_backend.application.ofima.MovimientoEmpleadoService;
import com.levi.levi_intranet_backend.domain.levis.Bonificaciones;
import com.levi.levi_intranet_backend.domain.levis.Quincenas;
import com.levi.levi_intranet_backend.domain.ofima.Empleados;
import com.levi.levi_intranet_backend.domain.ofima.NovedadesMovimientosEmpleados;
import com.levi.levi_intranet_backend.infrastructure.levis.dao.BonificacionesDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
public class BonificacionesService {
    private final BonificacionesDao dao;
    public final EmpleadosService _empleadosService;
    public final MovimientoEmpleadoService _movimientoEmpleadoService;

    public BonificacionesService(BonificacionesDao dao, EmpleadosService _empleadosService, MovimientoEmpleadoService _movimientoEmpleadoService) {
        this.dao = dao;
        this._empleadosService = _empleadosService;
        this._movimientoEmpleadoService = _movimientoEmpleadoService;
    }

    @Transactional(transactionManager = "levisTx")
    public List<Quincenas> getAllQuincenas() {
        return dao.findAllQuincenas();
    }

    @Transactional(transactionManager = "levisTx")
    public List<Bonificaciones> getAllBonificacionesByPeriodoAndResponsable(String periodo, String responsable) {
        return dao.findAllBonificacionesByPeriodoAndResponsable(periodo, responsable);
    }

    @Transactional(transactionManager = "levisTx")
    public boolean addBonificaciones(String periodo, String responsable, BonificacionesDtos.BonificacionesExcel[] bonificaciones) {
        return dao.addBonificaciones(periodo, responsable, bonificaciones);
    }

    @Transactional(transactionManager = "levisTx")
    public boolean deleteBonificaciones(String periodo, String responsable) {
        return dao.deleteBonificaciones(periodo, responsable);
    }

    @Transactional(transactionManager = "levisTx")
    public boolean uploadBonificaciones(String periodo, String responsable) throws Exception {

        // Obtenemos todas las bonificaciones por periodo y responsable
        List<Bonificaciones> bonificaciones = dao.findAllBonificacionesByPeriodoAndResponsable(periodo, responsable);
        // Obtenemos todos los empleados activos
        List<Empleados> empleados = _empleadosService.getAllEmpleadosActivo();
        // Obtenemos todas las quincenas
        Quincenas quincenas = getAllQuincenas().stream().filter(q -> q.getQuincena().equals("19-2025")).findFirst().orElse(null);
        // Obtenemos todas las novedades de los empleados (Por defecto siempre debería traer 0)
        List<NovedadesMovimientosEmpleados> novedadesEmpleado = _movimientoEmpleadoService.getNovedadesMovimientosEmpleados();
        // Obtenemos todos los movimientos anteriores de los empleados y que estén cerrados
        List<NovedadesMovimientosEmpleados> movimientosCerradosEmpleado = _movimientoEmpleadoService.getMovimientosCerradosEmpleados();

        // Definimos dos variables que permiten obtener la fecha de inicio y fecha de fin para los periodos de pago
        LocalDate fechaInicioPeriodoPago;
        LocalDate fechaFinPeriodoPago;

        if (quincenas != null) {
            fechaInicioPeriodoPago = quincenas.getFechaInicio().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            fechaFinPeriodoPago = quincenas.getFechaFin().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        } else {
            fechaInicioPeriodoPago = LocalDate.now();
            fechaFinPeriodoPago = LocalDate.now();
        }

        // Recorremos cada uno de los registros obtenidos de las bonificaciones
        for (Bonificaciones bonificacion : bonificaciones) {

            // Buscamos el empleado correspondiente a la bonificación en la lista de empleados activos, usando el número de Cedula (Empleado)
            Empleados empleado = empleados.stream().filter(e -> Long.parseLong(e.getCedula()) == bonificacion.getEmpleado()).findFirst().orElse(null);
            // Validamos si el empleado no es nulo
            if (empleado != null) {
                // Completamos la información de cada uno de los registros de las bonificaciones, con la información del empleado correspondiente a la bonificación
                bonificacion.setCodigo(empleado.getCodigo());
                bonificacion.setNombre(empleado.getNombre());
                bonificacion.setGrupo(empleado.getGrupo());
                bonificacion.setCentroCostos(Integer.parseInt(empleado.getCodigoCentroCostos()));
            }
        }

        // Filtramos todos los registros de las bonificaciones para solo dejar los que tienen el atributo 'nombre' diferente a nulo
        bonificaciones.stream().filter(b -> b.getNombre() != null).toList();

        // Validamos si la lista de bonificaciones está vacía después del filtro
        if (bonificaciones.isEmpty()) {
            throw new Exception("No existe Informacion con el filtro especificado");
        }
        else {
            // Recorremos la lista de bonificaciones después del filtro
            List<NovedadesMovimientosEmpleados> movimientosEmpleado = new ArrayList<>();
            for (Bonificaciones bonificacion : bonificaciones) {
                // Validamos si el atributo 'código' es diferente a nulo en el registro de bonificación
                if (bonificacion.getCodigo() != null){
                    // Validamos si hay alguna novedad en la lista de novedades
                    if (novedadesEmpleado.isEmpty()){
                        double valorAnterior = 0;

                        Calendar calendar = Calendar.getInstance();

                        // * Obtenemos los registros de la lista de MovimientosCerrados, filtrando por código, fecha de inicio y fecha de fin
                        LocalDate fechaComparar = fechaInicioPeriodoPago.minusDays(1);

                        List<NovedadesMovimientosEmpleados> movimientosAnteriores = movimientosCerradosEmpleado.stream()
                                .filter(mce -> Objects.equals(mce.getCodigo(), bonificacion.getCodigo()))
                                .filter(mce -> {
                                    LocalDate inicio = mce.getFechaInicio().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                                    LocalDate fin = mce.getFechaFin().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                                    return ( !inicio.isAfter(fechaComparar) && !fin.isBefore(fechaComparar) );
                                })
                                .toList();

                        // Validamos si la lista de 'movimientos anteriores' no está vacía
                        if (!movimientosAnteriores.isEmpty()){
                            // Definimos el valor anterior de la bonificación, obteniendo el valor anterior de la lista 'movimientos anteriores'
                            valorAnterior = movimientosAnteriores.getFirst().getValorAnterior();
                        }
                        // Definimos una instancia de tipo SimpleDateFormat para darle formato a las fechas nuevas
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

                        // Creamos una nueva instancia de MovimientosEmpleados por cada registro de bonificaciones, la cual será el nuevo objeto a guardar en la BD
                        NovedadesMovimientosEmpleados movimientoNuevo = new NovedadesMovimientosEmpleados();
                        movimientoNuevo.setCodigoCentroCostos(bonificacion.getCentroCostos());
                        movimientoNuevo.setCodigo(bonificacion.getCodigo());
                        movimientoNuevo.setConcepto("037");
                        movimientoNuevo.setFechaLiquidacion(sdf.parse("1900/01/01 00:00:00"));
                        movimientoNuevo.setFechaIngreso(calendar.getTime());
                        movimientoNuevo.setFechaInicio(Date.from(fechaInicioPeriodoPago.atStartOfDay(ZoneId.systemDefault()).toInstant()));
                        movimientoNuevo.setFechaModificacion(calendar.getTime());
                        movimientoNuevo.setGrupo(bonificacion.getGrupo());
                        movimientoNuevo.setIntegrado(false);
                        movimientoNuevo.setNominaAbierta(true);
                        movimientoNuevo.setNumeroHoras(0);
                        movimientoNuevo.setPasswordIn("AppNovAdd");
                        movimientoNuevo.setPasswordMo("");
                        movimientoNuevo.setValor(bonificacion.getValor());
                        movimientoNuevo.setNota("PRUEBAFELIPE");

                        movimientosEmpleado.add(movimientoNuevo);

                    }
                }
            }
            _movimientoEmpleadoService.saveNovedadesMovimientoEmpleado(movimientosEmpleado);
        }

        return true;

    }
}
