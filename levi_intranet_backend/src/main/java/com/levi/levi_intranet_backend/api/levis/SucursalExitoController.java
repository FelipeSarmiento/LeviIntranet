package com.levi.levi_intranet_backend.api.levis;

import com.levi.levi_intranet_backend.application.levis.SucursalExitoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/levis/SucursalExito") // prefijo de la ruta
public class SucursalExitoController {

    private final SucursalExitoService sucursalExitoService;

    public SucursalExitoController(SucursalExitoService sucursalExitoService) {
        this.sucursalExitoService = sucursalExitoService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(sucursalExitoService.getAllSucursalesExito());
    }

    @GetMapping("/sucursalById")
    public ResponseEntity<?> getSucursalById(@RequestParam int id) {
        return ResponseEntity.ok(sucursalExitoService.getSucursalesExitoById(id));
    }
}
