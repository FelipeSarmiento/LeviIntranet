package com.levi.levi_intranet_backend.api.siesa;

import com.levi.levi_intranet_backend.application.siesa.BodegaService;
import com.levi.levi_intranet_backend.application.siesa.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/siesa/bodegas") // prefijo de la ruta
public class BodegaController {

    private final BodegaService bodegaService;

    public BodegaController(BodegaService bodegaService) {
        this.bodegaService = bodegaService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(bodegaService.getAllBodegas());
    }

    @GetMapping("/ubicaciones")
    public ResponseEntity<?> getAllUbicaciones(@RequestParam String bodega, @RequestParam String compania) {
        return ResponseEntity.ok(bodegaService.getAllUbicacionesBodega(bodega, compania));
    }

}
