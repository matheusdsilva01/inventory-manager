package com.project.api.services;

import com.project.api.dto.ProductDTO;
import com.project.api.dto.RecipeDTO;
import com.project.api.dto.RecipeItemDTO;
import com.project.api.models.Product;
import com.project.api.models.Recipe;
import com.project.api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;

    @Autowired
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getProducts() {
        return repository.findAll();
    }

    public Product createProduct(ProductDTO product) {
        return repository.save(product.toProduct());
    }

    public List<Recipe> getRecipeForProduct(String productId) {
        Product product = repository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        return product.getRecipes();
    }
}
