package com.levi.levi_intranet_backend.api.levis;

import com.levi.levi_intranet_backend.application.levis.BonificacionesService;
import com.levi.levi_intranet_backend.application.levis.SucursalExitoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/levis/Bonificaciones") // prefijo de la ruta
public class BonificacionesController {

    private final BonificacionesService bonificacionesService;

    public BonificacionesController(BonificacionesService bonificacionesService) {
        this.bonificacionesService = bonificacionesService;
    }

    @GetMapping("/getQuincenas")
    public ResponseEntity<?> getQuincenas() {
        return ResponseEntity.ok(bonificacionesService.getAllQuincenas());
    }
}
