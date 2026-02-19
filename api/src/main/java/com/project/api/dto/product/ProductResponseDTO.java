package com.project.api.dto.product;

import com.project.api.dto.recipe.RecipeProductResponseDTO;
import com.project.api.models.Product;

import java.util.UUID;

public record ProductResponseDTO(
        UUID id,
        String name,
        String code,
        Double price,
        RecipeProductResponseDTO recipe
) {
    public static ProductResponseDTO fromEntity(Product product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getCode(),
                product.getPrice(),
                product.getRecipe() != null ? RecipeProductResponseDTO.fromEntity(product.getRecipe()) : null
        );
    }
}

