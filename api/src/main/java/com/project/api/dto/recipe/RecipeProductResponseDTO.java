package com.project.api.dto.recipe;

import com.project.api.models.Recipe;

import java.util.List;
import java.util.UUID;

public record RecipeProductResponseDTO(
        UUID id,
        List<RecipeItemResponseDTO> recipeItems
) {
    public static RecipeProductResponseDTO fromEntity(Recipe recipe) {
        List<RecipeItemResponseDTO> items = recipe.getRecipeItems().stream()
                .map(RecipeItemResponseDTO::fromEntity)
                .toList();

        return new RecipeProductResponseDTO(
                recipe.getId(),
                items
        );
    }
}
