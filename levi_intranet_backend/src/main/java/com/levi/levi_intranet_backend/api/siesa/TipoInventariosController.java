package com.levi.levi_intranet_backend.api.siesa;

import com.levi.levi_intranet_backend.application.siesa.CentroCostosSiesaService;
import com.levi.levi_intranet_backend.application.siesa.TipoInventarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/siesa/tipoInventarios") // prefijo de la ruta
public class TipoInventariosController {

    private final TipoInventarioService tipoInventarioService;

    public TipoInventariosController(TipoInventarioService tipoInventarioService) {
        this.tipoInventarioService = tipoInventarioService;
    }

    @GetMapping
    public ResponseEntity<?> getAll(String centroCosto, String compania) {
        return ResponseEntity.ok(tipoInventarioService.getTipoInventariosByCentroCosto(centroCosto, compania));
    }

}
