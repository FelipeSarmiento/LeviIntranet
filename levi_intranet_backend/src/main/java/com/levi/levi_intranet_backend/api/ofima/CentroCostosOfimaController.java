package com.levi.levi_intranet_backend.api.ofima;

import com.levi.levi_intranet_backend.application.ofima.CentroCostosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ofima/centroCostos")
public class CentroCostosOfimaController {

    private final CentroCostosService centroCostosService;

    public CentroCostosOfimaController(CentroCostosService centroCostosService) {
        this.centroCostosService = centroCostosService;
    }

    @GetMapping
    public ResponseEntity<?> Get() {
        return ResponseEntity.ok(centroCostosService.getAllCentroCostos());
    }

}
