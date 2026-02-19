package com.project.api.dto.recipe;

import com.project.api.models.RawMaterial;
import com.project.api.models.Recipe;
import com.project.api.models.RecipeItem;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.UUID;

public record RecipeItemDTO (
        @NotNull UUID rawMaterialId,
        @Positive Double quantity
) {
    public RecipeItem toRecipeItem(Recipe recipe, RawMaterial rawMaterial) {
        RecipeItem recipeItem = new RecipeItem();
        recipeItem.setRecipe(recipe);
        recipeItem.setRawMaterial(rawMaterial);
        recipeItem.setQuantity(this.quantity());
        return recipeItem;
    }
}
