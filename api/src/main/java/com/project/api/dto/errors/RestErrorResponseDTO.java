package com.project.api.dto.errors;

import java.time.LocalDateTime;

public record RestErrorResponseDTO(
        LocalDateTime timestamp,
        String message
) {
}
