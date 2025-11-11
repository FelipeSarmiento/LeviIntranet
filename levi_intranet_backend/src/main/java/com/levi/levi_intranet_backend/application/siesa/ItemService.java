package com.levi.levi_intranet_backend.application.siesa;

import com.levi.levi_intranet_backend.domain.siesa.Items;
import com.levi.levi_intranet_backend.domain.siesa.ItemsEtiquetas;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.ItemDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ItemService
{
    private final ItemDao dao;
    public ItemService(ItemDao dao){ this.dao = dao; }

    @Transactional(readOnly = true, transactionManager = "siesaTx")
    public List<Items> getAllItems(){
        return dao.findAllItems();
    }

    @Transactional(transactionManager = "siesaTx")
    public Optional<Items> getItemById(int id){
        return dao.findItemById(id);
    }

    @Transactional(transactionManager = "siesaTx")
    public List<ItemsEtiquetas> getItemsById(int id, String listaPrecio, String compania){
        return dao.findItemsById(id, listaPrecio, compania);
    }
    @Transactional(transactionManager = "siesaTx")
    public List<ItemsEtiquetas> getItemsByIds(String[] ids, String compania){
        return dao.findItemsByIds(ids, compania);
    }
    @Transactional(transactionManager = "siesaTx")
    public List<ItemsEtiquetas> getItemsByCodigoBarra(String codigoBarra, String listaPrecio, String compania){
        return dao.findItemsByCodigoBarra(codigoBarra, listaPrecio, compania);
    }

}
