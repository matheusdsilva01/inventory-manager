package com.project.api.dto.rawmaterial;

import com.project.api.models.RawMaterial;

import java.util.UUID;

public record RawMaterialResponseDTO(
        UUID id,
        String name,
        String code,
        Number quantity
) {
    public static RawMaterialResponseDTO fromEntity(RawMaterial rawMaterial) {
        return new RawMaterialResponseDTO(
                rawMaterial.getId(),
                rawMaterial.getName(),
                rawMaterial.getCode(),
                rawMaterial.getQuantity()
        );
    }
}

