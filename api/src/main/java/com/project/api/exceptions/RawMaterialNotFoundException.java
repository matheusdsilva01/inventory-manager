package com.project.api.exceptions;

public class RawMaterialNotFoundException extends RestException {
    public RawMaterialNotFoundException(String id) {
        super(String.format("Raw material with id: %s not found", id), 404);
    }
}
