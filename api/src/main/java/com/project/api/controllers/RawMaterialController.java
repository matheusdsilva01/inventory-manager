package com.project.api.controllers;

import com.project.api.dto.rawmaterial.CreateRawMaterialDTO;
import com.project.api.dto.rawmaterial.RawMaterialResponseDTO;
import com.project.api.dto.rawmaterial.UpdateRawMaterialDTO;
import com.project.api.services.RawMaterialService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/raw-materials")
class RawMaterialController {
    private final RawMaterialService rawMaterialService;

    public RawMaterialController(RawMaterialService rawMaterialService) {
        this.rawMaterialService = rawMaterialService;
    }

    @GetMapping
    public ResponseEntity<List<RawMaterialResponseDTO>> getRawMaterials() {
        List<RawMaterialResponseDTO> materials = rawMaterialService.getRawMaterials().stream()
                .map(RawMaterialResponseDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(materials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RawMaterialResponseDTO> getRawMaterialById(@PathVariable UUID id) {
        return ResponseEntity.ok(RawMaterialResponseDTO.fromEntity(rawMaterialService.getRawMaterialById(id)));
    }

    @PostMapping
    public ResponseEntity<RawMaterialResponseDTO> createRawMaterial(@Valid @RequestBody CreateRawMaterialDTO rawMaterial) {
        var created = rawMaterialService.createRawMaterial(rawMaterial);
        return new ResponseEntity<>(RawMaterialResponseDTO.fromEntity(created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RawMaterialResponseDTO> updateRawMaterial(@PathVariable UUID id, @Valid @RequestBody UpdateRawMaterialDTO dto) {
        return ResponseEntity.ok(RawMaterialResponseDTO.fromEntity(rawMaterialService.updateRawMaterial(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRawMaterial(@PathVariable UUID id) {
        rawMaterialService.deleteRawMaterial(id);
        return ResponseEntity.noContent().build();
    }
}
