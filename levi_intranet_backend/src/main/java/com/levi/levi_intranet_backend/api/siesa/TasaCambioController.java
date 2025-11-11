package com.levi.levi_intranet_backend.api.siesa;

import com.levi.levi_intranet_backend.application.siesa.ListaPreciosService;
import com.levi.levi_intranet_backend.application.siesa.TasaCambioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/siesa/tasaCambio") // prefijo de la ruta
public class TasaCambioController {

    private final TasaCambioService tasaCambioService;

    public TasaCambioController(TasaCambioService tasaCambioService) {
        this.tasaCambioService = tasaCambioService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(tasaCambioService.getAllTasaCambio());
    }

}
