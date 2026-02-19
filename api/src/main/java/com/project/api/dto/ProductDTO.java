package com.project.api.dto;

import com.project.api.models.Product;

public class ProductDTO {
    private String id;
    private String name;
    private String code;
    private double price;

    public ProductDTO(String name, String code, double price) {
        this.name = name;
        this.code = code;
        this.price = price;
    }

    public Product toProduct() {
        Product product = new Product();

        product.setName(this.name);
        product.setCode(this.code);
        product.setPrice(this.price);

        return product;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}