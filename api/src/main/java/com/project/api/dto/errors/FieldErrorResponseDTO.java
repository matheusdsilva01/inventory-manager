package com.project.api.dto.errors;

public record FieldErrorResponseDTO(
        String field,
        String message
) {
}
