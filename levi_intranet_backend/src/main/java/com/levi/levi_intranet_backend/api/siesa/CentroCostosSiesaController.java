package com.levi.levi_intranet_backend.api.siesa;

import com.levi.levi_intranet_backend.application.siesa.CentroCostosSiesaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/siesa/centroCostos") // prefijo de la ruta
public class CentroCostosSiesaController {

    private final CentroCostosSiesaService centroCostosService;

    public CentroCostosSiesaController(CentroCostosSiesaService centroCostosService) {
        this.centroCostosService = centroCostosService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(centroCostosService.getAllCentroCostos());
    }

}
