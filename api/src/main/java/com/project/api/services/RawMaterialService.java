package com.project.api.services;

import com.project.api.dto.rawmaterial.CreateRawMaterialDTO;
import com.project.api.dto.rawmaterial.UpdateRawMaterialDTO;
import com.project.api.exceptions.CannotDeleteRawMaterialException;
import com.project.api.exceptions.RawMaterialNotFoundException;
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
                .orElseThrow(() -> new RawMaterialNotFoundException(id.toString()));
    }

    public RawMaterial createRawMaterial(CreateRawMaterialDTO rawMaterial) {
        return repository.save(rawMaterial.toRawMaterial());
    }

    public RawMaterial updateRawMaterial(UUID id, UpdateRawMaterialDTO dto) {
        RawMaterial existing = repository.findById(id)
                .orElseThrow(() -> new RawMaterialNotFoundException(id.toString()));

        existing.setName(dto.name());
        existing.setCode(dto.code());
        existing.setQuantity(dto.quantity());

        return repository.save(existing);
    }

    public void deleteRawMaterial(UUID id) {
        RawMaterial rawMaterial = repository.findById(id)
                .orElseThrow(() -> new RawMaterialNotFoundException(id.toString()));

        if (rawMaterial.getRecipeItems() != null && !rawMaterial.getRecipeItems().isEmpty()) {
            throw new CannotDeleteRawMaterialException(id.toString());
        }

        repository.deleteById(id);
    }
}
