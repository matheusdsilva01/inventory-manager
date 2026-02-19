package com.project.api.services;

import com.project.api.dto.product.CreateProductDTO;
import com.project.api.dto.product.ProductDTO;
import com.project.api.models.Product;
import com.project.api.models.Recipe;
import com.project.api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {
    private final ProductRepository repository;

    @Autowired
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<ProductDTO> getProducts() {
        return repository.findAll().stream().map(product -> new ProductDTO(product.getId(), product.getName(), product.getCode(), product.getPrice())).toList();
    }

    public Product getProductById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Product with id %s not found", id)));
    }

    public Product createProduct(CreateProductDTO product) {
        return repository.save(product.toProduct());
    }

    @Transactional(readOnly = true)
    public Recipe getRecipeForProduct(UUID productId) {
        Product product = repository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        return product.getRecipe();
    }

    public Product updateProduct(UUID id, ProductDTO productDTO) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Product with id %s not found", id)));

        product.setName(productDTO.name());
        product.setCode(productDTO.code());
        product.setPrice(productDTO.price());

        return repository.save(product);
    }

    public void deleteProduct(UUID id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Product with id %s not found", id)));

        repository.delete(product);
    }

}
