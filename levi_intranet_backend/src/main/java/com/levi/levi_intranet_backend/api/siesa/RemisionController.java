package com.levi.levi_intranet_backend.api.siesa;

import com.levi.levi_intranet_backend.application.siesa.RemisionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/siesa/remisiones") // prefijo de la ruta
public class RemisionController {

    private final RemisionService remisionService;

    public RemisionController(RemisionService remisionService) {
        this.remisionService = remisionService;
    }

    @PostMapping("/remisionByConsecutivo")
    public ResponseEntity<?> getSucursalById(@RequestBody String[] consecutivos) {
        return ResponseEntity.ok(remisionService.getRemisionesByConsecutivo(consecutivos));
    }
}
