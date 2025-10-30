package com.levi.levi_intranet_backend.api.siesa;

import com.levi.levi_intranet_backend.application.siesa.ListaPreciosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/siesa/listaPrecios") // prefijo de la ruta
public class ListaPrecioController {

    private final ListaPreciosService listaPrecioService;

    public ListaPrecioController(ListaPreciosService listaPrecioService) {
        this.listaPrecioService = listaPrecioService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(listaPrecioService.getAllListaPrecios());
    }

}
