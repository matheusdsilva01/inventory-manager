package com.project.api.dto.recipe;

import com.project.api.models.Recipe;

import java.util.List;
import java.util.UUID;

public record RecipeResponseDTO(
        UUID id,
        UUID productId,
        String productName,
        List<RecipeItemResponseDTO> recipeItems
) {
    public static RecipeResponseDTO fromEntity(Recipe recipe) {
        List<RecipeItemResponseDTO> items = recipe.getRecipeItems().stream()
                .map(RecipeItemResponseDTO::fromEntity)
                .toList();

        return new RecipeResponseDTO(
                recipe.getId(),
                recipe.getProduct().getId(),
                recipe.getProduct().getName(),
                items
        );
    }
}

