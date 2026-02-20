package com.project.api.exceptions;

public class CannotDeleteRawMaterialException extends RestException {
    public CannotDeleteRawMaterialException(String id) {
        super(String.format("Cannot delete raw material with: id %s because it is used in a recipe", id), 400);
    }
}
