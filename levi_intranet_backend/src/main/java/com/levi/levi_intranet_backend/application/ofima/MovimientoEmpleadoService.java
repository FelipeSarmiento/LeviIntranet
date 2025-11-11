package com.levi.levi_intranet_backend.application.ofima;

import com.levi.levi_intranet_backend.domain.ofima.NovedadesMovimientosEmpleados;
import com.levi.levi_intranet_backend.infrastructure.ofima.dao.MovimientoEmpleadoDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MovimientoEmpleadoService
{
    private final MovimientoEmpleadoDao dao;
    public MovimientoEmpleadoService(MovimientoEmpleadoDao dao){ this.dao = dao; }

    @Transactional(transactionManager = "ofimaTx")
    public List<NovedadesMovimientosEmpleados> getNovedadesMovimientosEmpleados(){
        return dao.findNovedadesMovimientosEmpleados();
    }
    @Transactional(transactionManager = "ofimaTx")
    public List<NovedadesMovimientosEmpleados> getMovimientosCerradosEmpleados(){
        return dao.findMovimientosCerradosEmpleados();
    }

    @Transactional(transactionManager = "ofimaTx")
    public void saveNovedadesMovimientoEmpleado(List<NovedadesMovimientosEmpleados> movimientosEmpleado){
        dao.saveNovedadesMovimientoEmpleado(movimientosEmpleado);
    }


}
