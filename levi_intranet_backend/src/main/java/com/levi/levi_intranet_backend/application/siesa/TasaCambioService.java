package com.levi.levi_intranet_backend.application.siesa;

import com.levi.levi_intranet_backend.domain.siesa.TasaCambio;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.TasaCambioDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TasaCambioService
{
    private final TasaCambioDao dao;
    public TasaCambioService(TasaCambioDao dao){ this.dao = dao; }

    @Transactional(readOnly = true, transactionManager = "siesaTx")
    public List<TasaCambio> getAllTasaCambio(){
        return dao.findAllTasasCambio();
    }

}
