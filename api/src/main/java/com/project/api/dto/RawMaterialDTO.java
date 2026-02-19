package com.project.api.dto;

import com.project.api.models.RawMaterial;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class RawMaterialDTO {
    private String id;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Code is required")
    private String code;
    @NotNull(message = "Quantity is required")
    @PositiveOrZero(message = "Quantity must be zero or positive")
    private Number quantity;

    public RawMaterialDTO(String name, String code, Number quantity) {
        this.name = name;
        this.code = code;
        this.quantity = quantity;
    }

    public RawMaterial toRawMaterial() {
        RawMaterial rawMaterial = new RawMaterial();

        rawMaterial.setName(this.name);
        rawMaterial.setCode(this.code);
        rawMaterial.setQuantity(this.quantity);

        return rawMaterial;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Number getQuantity() {
        return quantity;
    }

    public void setQuantity(Number quantity) {
        this.quantity = quantity;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
