package com.levi.levi_intranet_backend.api.ofima;

import com.levi.levi_intranet_backend.application.ofima.CertificadosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ofima/certificados")
public class CertificadosController {

    private final CertificadosService certificadosService;

    public CertificadosController(CertificadosService certificadosService) {
        this.certificadosService = certificadosService;
    }

    @GetMapping("/activo")
    public ResponseEntity<?> getCertificadoActivoByCedula(@RequestParam String cedula) {
        return ResponseEntity.ok(certificadosService.getCertificadoActivoByCedula(cedula));
    }

    @GetMapping("/activos")
    public ResponseEntity<?> getCertificadoActivosByCedula(@RequestParam String cedula) {
        return ResponseEntity.ok(certificadosService.getCertificadosActivoByCedula(cedula));
    }

    @GetMapping("/retirado")
    public ResponseEntity<?> getCertificadoRetiradoByCedula(@RequestParam String cedula) {
        return ResponseEntity.ok(certificadosService.getCertificadoRetiradoByCedula(cedula));
    }

    @GetMapping("/retirados")
    public ResponseEntity<?> getCertificadoRetiradosByCedula(@RequestParam String cedula) {
        return ResponseEntity.ok(certificadosService.getCertificadosRetiradoByCedula(cedula));
    }

    @GetMapping("/ContratosProximoVencerByCedula")
    public ResponseEntity<?> getContratosProximosVencerByCedula(@RequestParam String cedula, @RequestParam String centroCostos) {
        return ResponseEntity.ok(certificadosService.getContratosProximosVencerByCedula(cedula, centroCostos));
    }

    @GetMapping("/ContratosProximoVencer")
    public ResponseEntity<?> getContratosProximosVencer() {
        return ResponseEntity.ok(certificadosService.getContratosProximosVencer());
    }
}
