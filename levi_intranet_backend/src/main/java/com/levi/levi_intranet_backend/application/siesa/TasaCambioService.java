package com.levi.levi_intranet_backend.application.siesa;

import com.levi.levi_intranet_backend.domain.siesa.Items;
import com.levi.levi_intranet_backend.domain.siesa.ItemsEtiquetas;
import com.levi.levi_intranet_backend.domain.siesa.ListaPrecios;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.ItemDao;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.ListaPrecioDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ListaPreciosService
{
    private final ListaPrecioDao dao;
    public ListaPreciosService(ListaPrecioDao dao){ this.dao = dao; }

    @Transactional(readOnly = true, transactionManager = "siesaTx")
    public List<ListaPrecios> getAllListaPrecios(){
        return dao.findAllListaPrecios();
    }

}
