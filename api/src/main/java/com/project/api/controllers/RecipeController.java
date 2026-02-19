package com.project.api.controllers;

import com.project.api.dto.recipe.CreateRecipeDTO;
import com.project.api.dto.recipe.RecipeItemDTO;
import com.project.api.dto.recipe.RecipeResponseDTO;
import com.project.api.models.Recipe;
import com.project.api.services.RecipeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/recipes")
class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public ResponseEntity<List<RecipeResponseDTO>> getRecipes() {
        List<RecipeResponseDTO> recipes = recipeService.findAll().stream()
                .map(RecipeResponseDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponseDTO> getRecipeById(@PathVariable UUID id) {
        Recipe recipe = recipeService.findById(id);
        return ResponseEntity.ok(RecipeResponseDTO.fromEntity(recipe));
    }

    @PostMapping
    public ResponseEntity<RecipeResponseDTO> create(@Valid @RequestBody CreateRecipeDTO createRecipeDTO) {
        Recipe recipe = recipeService.store(createRecipeDTO);
        return new ResponseEntity<>(RecipeResponseDTO.fromEntity(recipe), HttpStatus.CREATED);
    }

    @PostMapping("/{id}/items")
    public ResponseEntity<RecipeResponseDTO> addItem(@PathVariable UUID id, @Valid @RequestBody RecipeItemDTO itemDTO) {
        Recipe recipe = recipeService.addItem(id, itemDTO);
        return ResponseEntity.ok(RecipeResponseDTO.fromEntity(recipe));
    }

    @DeleteMapping("/{id}/items/{rawMaterialId}")
    public ResponseEntity<RecipeResponseDTO> removeItem(@PathVariable UUID id, @PathVariable UUID rawMaterialId) {
        Recipe recipe = recipeService.removeItem(id, rawMaterialId);
        return ResponseEntity.ok(RecipeResponseDTO.fromEntity(recipe));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        recipeService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
