package com.levi.levi_intranet_backend.api.levis.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public class SucursalExitoDtos {

    public static record SucursalExitoCreateRequest(
            @NotBlank @Size(max = 120) String name,
            @NotBlank @Email @Size(max = 200) String email
    ) {}

    public static record IdResponse(UUID id) {}
}
