package com.project.api.controllers;

import com.project.api.dto.RecipeDTO;
import com.project.api.models.Recipe;
import com.project.api.services.RecipeService;
import jakarta.validation.Valid;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipes")
class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping
    public ResponseEntity<Recipe> create(@Valid @RequestBody RecipeDTO recipeDTO) {
        Recipe recipe = recipeService.store(recipeDTO);
        return new ResponseEntity<>(recipe, HttpStatus.CREATED);
    }
}
