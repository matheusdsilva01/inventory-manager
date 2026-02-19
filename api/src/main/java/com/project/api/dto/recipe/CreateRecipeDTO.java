package com.project.api.dto.recipe;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record CreateRecipeDTO(
        @NotNull UUID productId,
        @Valid @NotEmpty @NotNull List<RecipeItemDTO> recipeItems
) {
}