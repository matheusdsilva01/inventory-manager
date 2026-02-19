package com.project.api.dto;

import com.project.api.models.RecipeItem;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record RecipeItemDTO (
        @NotNull @NotEmpty String rawMaterialId,
        @Positive Double quantity
) {
    public RecipeItem toRecipeItem(String recipeId) {
        RecipeItem recipeItem = new RecipeItem();
        recipeItem.setRecipeId(recipeId);
        recipeItem.setRawMaterialId(this.rawMaterialId());
        recipeItem.setQuantity(this.quantity());
        return recipeItem;
    }
}
