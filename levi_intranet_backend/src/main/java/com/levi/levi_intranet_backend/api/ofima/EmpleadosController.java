package com.levi.levi_intranet_backend.api.ofima;

import com.levi.levi_intranet_backend.application.ofima.EmpleadosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ofima/empleados")
public class EmpleadosController {

    private final EmpleadosService _empleadosService;

    public EmpleadosController(EmpleadosService _empleadosService) {
        this._empleadosService = _empleadosService;
    }

    @GetMapping("/activo")
    public ResponseEntity<?> getEmpleadoActivoByCedula(@RequestParam String cedula) {
        return ResponseEntity.ok(_empleadosService.getEmpleadoActivoByCedula(cedula));
    }

    // REVISAR
    @GetMapping("/activos")
    public ResponseEntity<?> getEmpleadosActivosByCedula(@RequestParam String cedula) {
        return ResponseEntity.ok(_empleadosService.getEmpleadosActivoByCedula(cedula));
    }
    @GetMapping("/allActivos")
    public ResponseEntity<?> getAllEmpleadosActivo() {
        return ResponseEntity.ok(_empleadosService.getAllEmpleadosActivo());
    }

    @GetMapping("/allActivosByCedula")
    public ResponseEntity<?> getAllEmpleadosActivosByCedulas(String[] cedulas) {
        return ResponseEntity.ok(_empleadosService.getAllEmpleadosActivo());
    }

    @GetMapping("/retirado")
    public ResponseEntity<?> getEmpleadoRetiradoByCedula(@RequestParam String cedula) {
        return ResponseEntity.ok(_empleadosService.getEmpleadoRetiradoByCedula(cedula));
    }

    @GetMapping("/retirados")
    public ResponseEntity<?> getEmpleadosRetiradosByCedula(@RequestParam String cedula) {
        return ResponseEntity.ok(_empleadosService.getEmpleadosRetiradosByCedula(cedula));
    }

    @GetMapping("/ContratosProximoVencerByCedula")
    public ResponseEntity<?> getEmpleadoProximoVencerByCedula(@RequestParam String cedula, @RequestParam String centroCostos) {
        return ResponseEntity.ok(_empleadosService.getEmpleadosProximosVencerByCedula(cedula, centroCostos));
    }

    @GetMapping("/ContratosProximoVencer")
    public ResponseEntity<?> getEmpleadosProximosVencer() {
        return ResponseEntity.ok(_empleadosService.getEmpleadosProximosVencer());
    }
}
