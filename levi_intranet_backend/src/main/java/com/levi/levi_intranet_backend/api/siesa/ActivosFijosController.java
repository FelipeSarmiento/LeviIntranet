package com.levi.levi_intranet_backend.api.siesa;

import com.levi.levi_intranet_backend.application.siesa.ActivosFijosService;
import com.levi.levi_intranet_backend.application.siesa.TipoInventarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/siesa/activosFijos") // prefijo de la ruta
public class ActivosFijosController {

    private final ActivosFijosService activosFijosService;

    public ActivosFijosController(ActivosFijosService activosFijosService) {
        this.activosFijosService = activosFijosService;
    }

    @GetMapping
    public ResponseEntity<?> getAll(String centroCosto, String tipoInventario, String compania) {
        return ResponseEntity.ok(activosFijosService.getActivosFijos(centroCosto,tipoInventario, compania));
    }

}
