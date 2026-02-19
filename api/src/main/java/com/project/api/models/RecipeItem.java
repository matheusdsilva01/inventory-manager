package com.project.api.models;

import com.project.api.dto.RecipeItemDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "recipe_items")
public class RecipeItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String recipeId;
    private String rawMaterialId;
    private Double quantity;

    public RecipeItemDTO toRecipeItemDTO() {
        return new RecipeItemDTO(this.rawMaterialId, this.quantity);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public String getRawMaterialId() {
        return rawMaterialId;
    }

    public void setRawMaterialId(String rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }
}
