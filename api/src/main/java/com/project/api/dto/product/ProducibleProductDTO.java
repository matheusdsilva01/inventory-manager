package com.project.api.dto.product;

import java.util.UUID;

public record ProducibleProductDTO(
        UUID id,
        String name,
        String code,
        double price,
        int maxProducibleUnits
) {
}
