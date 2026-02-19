package com.project.api.dto.rawmaterial;

import com.project.api.models.RawMaterial;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.UUID;

public record UpdateRawMaterialDTO(
        @NotNull(message = "Id is required")
        UUID id,
        @NotBlank(message = "Name is required")
        String name,
        @NotBlank(message = "Code is required")
        String code,
        @NotNull(message = "Quantity is required")
        @PositiveOrZero(message = "Quantity must be zero or positive")
        Number quantity
) {
    public RawMaterial toRawMaterial() {
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(this.id);
        rawMaterial.setName(this.name);
        rawMaterial.setCode(this.code);
        rawMaterial.setQuantity(this.quantity);
        return rawMaterial;
    }
}

