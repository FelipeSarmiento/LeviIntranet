package com.levi.levi_intranet_backend.api.levis;

import com.levi.levi_intranet_backend.application.levis.BonificacionesService;
import com.levi.levi_intranet_backend.api.levis.dto.BonificacionesDtos;
import com.levi.levi_intranet_backend.domain.levis.Bonificaciones;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/getBonificaciones")
    public ResponseEntity<?> getAllBonificacionesByPeriodoAndResponsable(@RequestParam String periodo, @RequestParam String responsable) {
        return ResponseEntity.ok(bonificacionesService.getAllBonificacionesByPeriodoAndResponsable(periodo, responsable));
    }
    @PostMapping("/addBonificaciones")
    public ResponseEntity<?> addBonificaciones(@RequestBody BonificacionesDtos.BonificacionesCreateRequest bonificacionesCreateRequest) {
        String periodo = bonificacionesCreateRequest.periodo();
        String responsable = bonificacionesCreateRequest.responsable();
        BonificacionesDtos.BonificacionesExcel[] bonificaciones = bonificacionesCreateRequest.bonificaciones();
        return ResponseEntity.ok(bonificacionesService.addBonificaciones(periodo, responsable, bonificaciones));
    }

    @DeleteMapping("/deleteBonificaciones")
    public ResponseEntity<?> deleteBonificaciones(@RequestParam String periodo, @RequestParam String responsable ) {
        return ResponseEntity.ok(bonificacionesService.deleteBonificaciones(periodo, responsable));
    }

    @GetMapping("/uploadBonificaciones")
    public ResponseEntity<?> uploadBonificaciones(@RequestParam String periodo, @RequestParam String responsable) throws Exception {
        return ResponseEntity.ok(bonificacionesService.uploadBonificaciones(periodo, responsable));
    }
}
