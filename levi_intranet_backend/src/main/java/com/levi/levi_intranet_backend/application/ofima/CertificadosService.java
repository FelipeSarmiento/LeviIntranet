package com.levi.levi_intranet_backend.application.ofima;

import com.levi.levi_intranet_backend.domain.ofima.Certificados;
import com.levi.levi_intranet_backend.infrastructure.ofima.dao.CertificadosDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CertificadosService
{
    private final CertificadosDao dao;
    public CertificadosService(CertificadosDao dao){ this.dao = dao; }

    @Transactional(transactionManager = "ofimaTx")
    public Optional<Certificados> getCertificadoActivoByCedula(String cedula){
        return dao.findCertificadoActivoByCedula(cedula);
    }

    @Transactional(transactionManager = "ofimaTx")
    public List<Certificados> getCertificadosActivoByCedula(String cedula){
        return dao.findCertificadosActivoByCedula(cedula);
    }


    @Transactional(transactionManager = "ofimaTx")
    public Optional<Certificados> getCertificadoRetiradoByCedula(String cedula){
        return dao.findCertificadoRetiradoByCedula(cedula);
    }

    @Transactional(transactionManager = "ofimaTx")
    public List<Certificados> getCertificadosRetiradoByCedula(String cedula){
        return dao.findCertificadosRetiradoByCedula(cedula);
    }

    @Transactional(transactionManager = "ofimaTx")
    public List<Certificados> getContratosProximosVencerByCedula(String cedula, String centroCostos){
        return dao.findContratosProximosVencerByCedula(cedula, centroCostos);
    }

    @Transactional(transactionManager = "ofimaTx")
    public List<Certificados> getContratosProximosVencer(){
        return dao.findContratosProximosVencer();
    }

}
