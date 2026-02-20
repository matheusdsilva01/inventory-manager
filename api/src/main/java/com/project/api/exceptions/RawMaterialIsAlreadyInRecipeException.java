package com.project.api.exceptions;

public class RawMaterialIsAlreadyInRecipeException extends RestException {
    public RawMaterialIsAlreadyInRecipeException(String id) {
        super(String.format("Raw material with: id %s is already in the recipe", id), 400);
    }
}
