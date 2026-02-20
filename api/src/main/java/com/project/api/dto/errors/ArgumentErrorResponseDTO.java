package com.project.api.dto.errors;

import java.time.LocalDateTime;
import java.util.List;

public record ArgumentErrorResponseDTO(
        LocalDateTime timestamp,
        String message,
        List<FieldErrorResponseDTO> errors
) {}