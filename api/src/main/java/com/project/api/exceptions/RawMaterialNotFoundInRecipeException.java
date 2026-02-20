package com.project.api.exceptions;

public class RawMaterialNotFoundInRecipeException extends RestException {
    public RawMaterialNotFoundInRecipeException(String id) {
        super(String.format("Raw material with id %s is not found in the recipe", id), 404);
    }
}
