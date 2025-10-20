package com.levi.levi_intranet_backend.application.levis;

import com.levi.levi_intranet_backend.domain.levis.Quincenas;
import com.levi.levi_intranet_backend.domain.levis.SucursalesExito;
import com.levi.levi_intranet_backend.infrastructure.levis.dao.BonificacionesDao;
import com.levi.levi_intranet_backend.infrastructure.levis.dao.SucursalExitoDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BonificacionesService
{
    private final BonificacionesDao dao;
    public BonificacionesService(BonificacionesDao dao){ this.dao = dao; }

    @Transactional(transactionManager = "levisTx")
    public List<Quincenas> getAllQuincenas(){
        return dao.findAllQuincenas();
    }

}
