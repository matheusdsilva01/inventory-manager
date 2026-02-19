package com.project.api.controllers;

import com.project.api.dto.recipe.CreateRecipeDTO;
import com.project.api.dto.recipe.RecipeResponseDTO;
import com.project.api.models.Recipe;
import com.project.api.services.RecipeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/recipes")
class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping
    public ResponseEntity<RecipeResponseDTO> create(@Valid @RequestBody CreateRecipeDTO createRecipeDTO) {
        Recipe recipe = recipeService.store(createRecipeDTO);
        return new ResponseEntity<>(RecipeResponseDTO.fromEntity(recipe), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        recipeService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
