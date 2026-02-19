package com.project.api.controllers;

import com.project.api.dto.RawMaterialDTO;
import com.project.api.models.RawMaterial;
import com.project.api.services.RawMaterialService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/raw-materials")
class RawMaterialController {
    private final RawMaterialService rawMaterialService;

    public RawMaterialController(RawMaterialService rawMaterialService) {
        this.rawMaterialService = rawMaterialService;
    }

    @GetMapping
    public ResponseEntity<List<RawMaterial>> getRawMaterials() {
        return ResponseEntity.ok(rawMaterialService.getRawMaterials());
    }

    @PostMapping
    public ResponseEntity<RawMaterial> createRawMaterial(@Valid @RequestBody RawMaterialDTO rawMaterial) {
        RawMaterial createdRawMaterial = rawMaterialService.createRawMaterial(rawMaterial);
        return new ResponseEntity<>(createdRawMaterial, HttpStatus.CREATED);
    }
}
