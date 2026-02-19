package com.project.api.dto.product;

import com.project.api.models.Product;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.UUID;

public record ProductDTO (
    @NotNull
    UUID id,
    @NotNull @NotEmpty
    String name,
    @NotNull @NotEmpty
    String code,
    @NotNull @Positive
    double price
) {
    public Product toProduct() {
        Product product = new Product();

        if (this.id != null) {
            product.setId(this.id);
        }
        product.setName(this.name);
        product.setCode(this.code);
        product.setPrice(this.price);

        return product;
    }
}