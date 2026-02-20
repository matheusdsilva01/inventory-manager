package com.project.api.exceptions;

public class RecipeNotFoundException extends RestException {
    public RecipeNotFoundException(String id) {
        super(String.format("Recipe with: id %s not found", id), 404);
    }
}
