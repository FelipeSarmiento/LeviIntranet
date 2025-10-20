package com.levi.levi_intranet_backend.application.siesa;

import com.levi.levi_intranet_backend.domain.siesa.Bodegas;
import com.levi.levi_intranet_backend.domain.siesa.Items;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.BodegaDao;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.ItemDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BodegaService
{
    private final BodegaDao dao;
    public BodegaService(BodegaDao dao){ this.dao = dao; }

    @Transactional(readOnly = true, transactionManager = "siesaTx")
    public List<Bodegas> getAllBodegas(){
        return dao.findAllBodegas();
    }

    @Transactional(readOnly = true, transactionManager = "siesaTx")
    public List<Map<String, String>> getAllUbicacionesBodega(String rowIdBodega, String compania){
        return dao.findAllUbicaciones(rowIdBodega, compania);
    }

}
