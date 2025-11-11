package com.levi.levi_intranet_backend.application.ofima;

import com.levi.levi_intranet_backend.domain.ofima.Empleados;
import com.levi.levi_intranet_backend.infrastructure.ofima.dao.EmpleadosDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadosService
{
    private final EmpleadosDao dao;
    public EmpleadosService(EmpleadosDao dao){ this.dao = dao; }

    @Transactional(transactionManager = "ofimaTx")
    public Optional<Empleados> getEmpleadoActivoByCedula(String cedula){
        return dao.findEmpleadoActivoByCedula(cedula);
    }

    @Transactional(transactionManager = "ofimaTx")
    public List<Empleados> getEmpleadosActivoByCedula(String cedula){
        return dao.findEmpleadosActivosByCedula(cedula);
    }

    @Transactional(transactionManager = "ofimaTx")
    public List<Empleados> getAllEmpleadosActivo(){
        return dao.findAllEmpleadosActivos();
    }
    @Transactional(transactionManager = "ofimaTx")
    public List<Empleados> getAllEmpleadosActivosByCedula(){
        return dao.findAllEmpleadosActivos();
    }

    @Transactional(transactionManager = "ofimaTx")
    public Optional<Empleados> getEmpleadoRetiradoByCedula(String cedula){
        return dao.findEmpleadoRetiradoByCedula(cedula);
    }

    @Transactional(transactionManager = "ofimaTx")
    public List<Empleados> getEmpleadosRetiradosByCedula(String cedula){
        return dao.findEmpleadosRetiradosByCedula(cedula);
    }

    @Transactional(transactionManager = "ofimaTx")
    public List<Empleados> getEmpleadosProximosVencerByCedula(String cedula, String centroCostos){
        return dao.findEmpleadosProximosVencerByCedula(cedula, centroCostos);
    }

    @Transactional(transactionManager = "ofimaTx")
    public List<Empleados> getEmpleadosProximosVencer(){
        return dao.findEmpleadosProximosVencer();
    }

}
