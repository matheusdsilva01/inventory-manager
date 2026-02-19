package com.project.api.dto.recipe;

import com.project.api.models.RecipeItem;

import java.util.UUID;

public record RecipeItemResponseDTO(
        UUID rawMaterialId,
        String rawMaterialName,
        String rawMaterialCode,
        Double quantity
) {
    public static RecipeItemResponseDTO fromEntity(RecipeItem item) {
        return new RecipeItemResponseDTO(
                item.getRawMaterial().getId(),
                item.getRawMaterial().getName(),
                item.getRawMaterial().getCode(),
                item.getQuantity()
        );
    }
}

