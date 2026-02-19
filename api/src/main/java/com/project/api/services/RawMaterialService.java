package com.project.api.services;

import com.project.api.dto.rawmaterial.CreateRawMaterialDTO;
import com.project.api.dto.rawmaterial.UpdateRawMaterialDTO;
import com.project.api.models.RawMaterial;
import com.project.api.repositories.RawMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RawMaterialService {
    private final RawMaterialRepository repository;

    @Autowired
    public RawMaterialService(RawMaterialRepository repository) {
        this.repository = repository;
    }

    public List<RawMaterial> getRawMaterials() {
        return repository.findAll();
    }

    public RawMaterial getRawMaterialById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Raw material with id " + id + " not found"));
    }

    public RawMaterial createRawMaterial(CreateRawMaterialDTO rawMaterial) {
        return repository.save(rawMaterial.toRawMaterial());
    }

    public RawMaterial updateRawMaterial(UUID id, UpdateRawMaterialDTO dto) {
        RawMaterial existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Raw material with id " + id + " not found"));

        existing.setName(dto.name());
        existing.setCode(dto.code());
        existing.setQuantity(dto.quantity());

        return repository.save(existing);
    }

    public void deleteRawMaterial(UUID id) {
        RawMaterial rawMaterial = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Raw material with id " + id + " does not exist"));

        if (rawMaterial.getRecipeItems() != null && !rawMaterial.getRecipeItems().isEmpty()) {
            throw new IllegalStateException("Cannot delete raw material with id " + id + " because it is linked to one or more recipes");
        }

        repository.deleteById(id);
    }
}
