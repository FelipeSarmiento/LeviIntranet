package com.levi.levi_intranet_backend.api.levis.dto;

import com.levi.levi_intranet_backend.domain.levis.Bonificaciones;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public class BonificacionesDtos {

    public static record BonificacionesCreateRequest(
            @NotBlank @Size(max = 10) String periodo,
            @NotBlank @Size(max = 200) String responsable,
            @NotBlank BonificacionesExcel[] bonificaciones
            ) {}

    public static record BonificacionesExcel(
            @NotBlank @Size(max = 20) String cedula,
            @NotBlank @Size(max = 200) String nombreEmpleado,
            @Positive double pagoBonificacion,
            boolean existeEmpleado
    ) {}
}
