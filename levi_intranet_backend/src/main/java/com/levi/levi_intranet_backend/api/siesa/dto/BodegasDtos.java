package com.levi.levi_intranet_backend.api.siesa.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public class BodegasDtos {

    public static record BodegaCreateRequest(
            @NotBlank @Size(max = 120) String name,
            @NotBlank @Email @Size(max = 200) String email
    ) {}

    public static record IdResponse(UUID id) {}
}
