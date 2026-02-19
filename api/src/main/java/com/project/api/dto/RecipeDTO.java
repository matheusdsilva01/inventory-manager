package com.project.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record RecipeDTO(
        @NotEmpty @NotNull String productId,
        @Valid @NotEmpty @NotNull List<RecipeItemDTO> recipeItems
) {
}