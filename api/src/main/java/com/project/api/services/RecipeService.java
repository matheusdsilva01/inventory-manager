package com.project.api.services;

import com.project.api.dto.recipe.CreateRecipeDTO;
import com.project.api.dto.recipe.RecipeItemDTO;
import com.project.api.exceptions.*;
import com.project.api.models.Product;
import com.project.api.models.RawMaterial;
import com.project.api.models.Recipe;
import com.project.api.models.RecipeItem;
import com.project.api.repositories.ProductRepository;
import com.project.api.repositories.RawMaterialRepository;
import com.project.api.repositories.RecipeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

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

    public Recipe store(CreateRecipeDTO createRecipeDTO) {
        Product product = productRepository.findById(createRecipeDTO.productId())
                .orElseThrow(() -> new ProductNotFoundException(createRecipeDTO.productId().toString()));

        Recipe recipe = new Recipe();
        recipe.setProduct(product);

        Set<RecipeItem> items = createRecipeDTO.recipeItems().stream().map(itemDTO -> {
            RawMaterial rawMaterial = rawMaterialRepository.findById(itemDTO.rawMaterialId())
                    .orElseThrow(() -> new RawMaterialNotFoundException(itemDTO.rawMaterialId().toString()));
            return itemDTO.toRecipeItem(recipe, rawMaterial);
        }).collect(Collectors.toSet());

        recipe.setRecipeItems(items);

        return repository.save(recipe);
    }

    public List<Recipe> findAll() {
        return repository.findAll();
    }

    public Recipe findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecipeNotFoundException(id.toString()));
    }

    public Recipe addItem(UUID recipeId, RecipeItemDTO itemDTO) {
        Recipe recipe = repository.findById(recipeId)
                .orElseThrow(() -> new RecipeNotFoundException(recipeId.toString()));

        RawMaterial rawMaterial = rawMaterialRepository.findById(itemDTO.rawMaterialId())
                .orElseThrow(() -> new RawMaterialNotFoundException(itemDTO.rawMaterialId().toString()));

        boolean alreadyExists = recipe.getRecipeItems().stream()
                .anyMatch(i -> i.getRawMaterial().getId().equals(rawMaterial.getId()));
        if (alreadyExists) {
            throw new RawMaterialIsAlreadyInRecipeException(rawMaterial.getId().toString());
        }

        recipe.getRecipeItems().add(itemDTO.toRecipeItem(recipe, rawMaterial));
        return repository.save(recipe);
    }

    public Recipe removeItem(UUID recipeId, UUID rawMaterialId) {
        Recipe recipe = repository.findById(recipeId)
                .orElseThrow(() -> new RecipeNotFoundException(recipeId.toString()));

        boolean removed = recipe.getRecipeItems()
                .removeIf(i -> i.getRawMaterial().getId().equals(rawMaterialId));

        if (!removed) {
            throw new RawMaterialNotFoundInRecipeException(rawMaterialId.toString());
        }

        return repository.save(recipe);
    }

    public void delete(UUID id) {
        if (!repository.existsById(id)) {
            throw new RecipeNotFoundException(id.toString());
        }
        repository.deleteById(id);
    }
}
