package com.levi.levi_intranet_backend.application.levis;

import com.levi.levi_intranet_backend.domain.levis.SucursalesExito;
import com.levi.levi_intranet_backend.domain.siesa.Items;
import com.levi.levi_intranet_backend.infrastructure.levis.dao.SucursalExitoDao;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.ItemDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SucursalExitoService
{
    private final SucursalExitoDao dao;
    public SucursalExitoService(SucursalExitoDao dao){ this.dao = dao; }

    @Transactional(readOnly = true, transactionManager = "levisTx")
    public List<SucursalesExito> getAllSucursalesExito(){
        return dao.findAllSucursalesExito();
    }

    @Transactional(transactionManager = "levisTx")
    public Optional<SucursalesExito> getSucursalesExitoById(int id){
        return dao.findSucursalExitoById(id);
    }

}
