package com.levi.levi_intranet_backend.application.siesa;

import com.levi.levi_intranet_backend.domain.siesa.TipoInventarios;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.TipoInventarioDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TipoInventarioService
{
    private final TipoInventarioDao dao;
    public TipoInventarioService(TipoInventarioDao dao){ this.dao = dao; }

    @Transactional(readOnly = true, transactionManager = "siesaTx")
    public List<TipoInventarios> getTipoInventariosByCentroCosto(String centroCosto, String compania){
        return dao.findTipoInventariosByCentroCosto(centroCosto, compania);
    }

}
