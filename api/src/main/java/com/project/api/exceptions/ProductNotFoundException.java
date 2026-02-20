package com.project.api.exceptions;

import org.springframework.http.HttpStatusCode;

public class ProductNotFoundException extends RestException {
    public ProductNotFoundException(String id) {
        super(String.format("Product with: id %s not found", id), HttpStatusCode.valueOf(404).value());
    }
}
