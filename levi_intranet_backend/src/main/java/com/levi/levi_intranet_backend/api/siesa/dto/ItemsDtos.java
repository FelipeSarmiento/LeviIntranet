package com.levi.levi_intranet_backend.api.siesa.dto;

import jakarta.validation.constraints.*;
import java.util.UUID;

public class ItemsDtos {

    public static record ItemCreateRequest(
            @NotBlank @Size(max = 120) String name,
            @NotBlank @Email @Size(max = 200) String email
    ) {}

    public static record IdResponse(UUID id) {}
}
