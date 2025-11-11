package com.levi.levi_intranet_backend.application.siesa;

import com.levi.levi_intranet_backend.domain.siesa.ActivosFijos;
import com.levi.levi_intranet_backend.domain.siesa.TipoInventarios;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.ActivosFijosDao;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.TipoInventarioDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class ActivosFijosService
{
    private final ActivosFijosDao dao;
    public ActivosFijosService(ActivosFijosDao dao){ this.dao = dao; }

    @Transactional(readOnly = true, transactionManager = "siesaTx")
    public List<ActivosFijos> getActivosFijos(@RequestParam String centroCosto, @RequestParam String tipoInventario, @RequestParam String compania){
        return dao.findActivosFijos(centroCosto, tipoInventario, compania);
    }

}
