package com.levi.levi_intranet_backend.application.siesa;

import com.levi.levi_intranet_backend.domain.siesa.CentroCostosSiesa;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.CentroCostosSiesaDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CentroCostosSiesaService
{
    private final CentroCostosSiesaDao dao;
    public CentroCostosSiesaService(CentroCostosSiesaDao dao){ this.dao = dao; }

    @Transactional(readOnly = true, transactionManager = "siesaTx")
    public List<CentroCostosSiesa> getAllCentroCostos(){
        return dao.findAllCentroCostos();
    }

}
