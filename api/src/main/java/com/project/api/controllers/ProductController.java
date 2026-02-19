package com.project.api.controllers;

import com.project.api.dto.ProductDTO;
import com.project.api.models.Product;
import com.project.api.models.Recipe;
import com.project.api.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO product) {
        Product createdProduct = productService.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        return new ResponseEntity<>(productService.getProducts(), HttpStatus.OK);
    }

    @GetMapping("/{id}/recipe")
    public ResponseEntity<List<Recipe>> getRecipeForProduct(@PathVariable String id) {
        return new ResponseEntity<>(productService.getRecipeForProduct(id), HttpStatus.OK);
    }
}
