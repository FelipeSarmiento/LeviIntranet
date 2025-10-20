package com.levi.levi_intranet_backend.application.siesa;

import com.levi.levi_intranet_backend.domain.levis.BodegasJumbo;
import com.levi.levi_intranet_backend.domain.siesa.Remisiones;
import com.levi.levi_intranet_backend.infrastructure.levis.dao.BodegasJumboDao;
import com.levi.levi_intranet_backend.infrastructure.siesa.dao.RemisionDao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RemisionService
{
    private final RemisionDao dao;
    private final BodegasJumboDao bodegasJumboDao;
    public RemisionService(RemisionDao dao, BodegasJumboDao bodegasJumboDao){
        this.dao = dao;
        this.bodegasJumboDao = bodegasJumboDao;
    }

    @Transactional(transactionManager = "levisTx")
    public List<Remisiones> getRemisionesByConsecutivo(String[] consecutivos){

        List<Remisiones> remisiones = dao.findRemisiones(consecutivos);
        Map<String, BodegasJumbo> bodegas = bodegasJumboDao.findAllBodegas();

        return remisiones.stream()
                .filter(r -> bodegas.get(r.getIdBodega().trim()) != null)
                .map(r -> {
                    BodegasJumbo b = bodegas.get(r.getIdBodega().trim());
                    Remisiones rem = new Remisiones();
                    rem.setNumeroDoc(r.getNumeroDoc());
                    rem.setFechaExp(r.getFechaExp());
                    rem.setProducto(r.getProducto());
                    rem.setTalla(r.getTalla());
                    rem.setReferencia(r.getReferencia());
                    rem.setDescripcion(r.getDescripcion());
                    rem.setCantidad(r.getCantidad());
                    rem.setCedi(b.getNombre());
                    rem.setDireccion(b.getDireccion());
                    rem.setTelefono(b.getTelefonos());
                    rem.setOC(r.getOC());
                    return rem;
                })
                .collect(Collectors.toList());



    }

}
