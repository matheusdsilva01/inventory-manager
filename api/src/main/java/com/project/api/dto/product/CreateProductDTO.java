package com.project.api.dto.product;

import com.project.api.models.Product;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateProductDTO (
        @NotNull @NotEmpty
        String name,
        @NotNull @NotEmpty
        String code,
        @NotNull @Positive
        double price
) {
    public Product toProduct() {
        Product product = new Product();

        product.setName(this.name);
        product.setCode(this.code);
        product.setPrice(this.price);

        return product;
    }
}