package com.project.api.services;

import com.project.api.dto.RecipeDTO;
import com.project.api.models.Recipe;
import com.project.api.repositories.ProductRepository;
import com.project.api.repositories.RawMaterialRepository;
import com.project.api.repositories.RecipeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class RecipeService {
    private final RecipeRepository repository;
    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;

    public RecipeService(RecipeRepository repository, ProductRepository productRepository, RawMaterialRepository rawMaterialRepository) {
        this.repository = repository;
        this.productRepository = productRepository;
        this.rawMaterialRepository = rawMaterialRepository;
    }

    public Recipe store(RecipeDTO recipeDTO) {
        boolean product = productRepository.existsById(recipeDTO.productId());
        if (!product) {
            throw new RuntimeException("Product not found: " + recipeDTO.productId());
        }

        Recipe recipe = repository.save(new Recipe(recipeDTO.productId()));

        recipe.setProductId(recipeDTO.productId());
        recipe.setRecipeItems(recipeDTO.recipeItems().stream()
                .map(item -> {
                    if (!rawMaterialRepository.existsById(item.rawMaterialId())) {
                        throw new RuntimeException("Raw material not found: " + item.rawMaterialId());
                    }
                    return item.toRecipeItem(recipe.getId());
                })
                .toList());
        return recipe;
    }
}
