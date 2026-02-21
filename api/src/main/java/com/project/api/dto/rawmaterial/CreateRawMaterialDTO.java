package com.project.api.dto.rawmaterial;

import com.project.api.models.RawMaterial;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record CreateRawMaterialDTO (
    @NotBlank(message = "Name is required")
    String name,
    @NotBlank(message = "Code is required")
    String code,
    @NotNull(message = "Quantity is required")
    @PositiveOrZero(message = "Quantity must be zero or positive")
    Integer quantity
) {

    public RawMaterial toRawMaterial() {
        RawMaterial rawMaterial = new RawMaterial();

        rawMaterial.setName(this.name);
        rawMaterial.setCode(this.code);
        rawMaterial.setQuantity(this.quantity);

        return rawMaterial;
    }
}