package com.levi.levi_intranet_backend.application.ofima;

import com.levi.levi_intranet_backend.domain.ofima.CentroCostosOfima;
import com.levi.levi_intranet_backend.infrastructure.ofima.dao.CentroCostosDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CentroCostosService
{
    private final CentroCostosDao dao;
    public CentroCostosService(CentroCostosDao dao){ this.dao = dao; }

    @Transactional(transactionManager = "ofimaTx")
    public List<CentroCostosOfima> getAllCentroCostos(){
        return dao.findAllCentroCostos();
    }

}
