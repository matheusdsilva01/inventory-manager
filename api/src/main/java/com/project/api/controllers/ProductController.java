package com.project.api.controllers;

import com.project.api.dto.recipe.RecipeResponseDTO;
import com.project.api.dto.product.CreateProductDTO;
import com.project.api.dto.product.ProductDTO;
import com.project.api.dto.product.ProductResponseDTO;
import com.project.api.models.Product;
import com.project.api.models.Recipe;
import com.project.api.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody CreateProductDTO product) {
        Product createdProduct = productService.createProduct(product);
        return new ResponseEntity<>(ProductResponseDTO.fromEntity(createdProduct), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProducts() {
        return new ResponseEntity<>(productService.getProducts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable UUID id) {
        Product product = productService.getProductById(id);
        return new ResponseEntity<>(ProductResponseDTO.fromEntity(product), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable UUID id, @Valid @RequestBody ProductDTO product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return new ResponseEntity<>(ProductResponseDTO.fromEntity(updatedProduct), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}/recipe")
    public ResponseEntity<RecipeResponseDTO> getRecipeForProduct(@PathVariable UUID id) {
        Recipe recipe = productService.getRecipeForProduct(id);
        return new ResponseEntity<>(RecipeResponseDTO.fromEntity(recipe), HttpStatus.OK);
    }
}
