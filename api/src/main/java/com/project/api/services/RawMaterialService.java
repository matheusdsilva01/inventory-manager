package com.project.api.services;

import com.project.api.dto.rawmaterial.CreateRawMaterialDTO;
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

    public RawMaterial createRawMaterial(CreateRawMaterialDTO rawMaterial) {
        return repository.save(rawMaterial.toRawMaterial());
    }

    public void deleteRawMaterial(UUID id) {
        boolean exists = repository.existsById(id);

        if (!exists) {
            throw new IllegalArgumentException("Raw material with id " + id + " does not exist");
        }

        repository.deleteById(id);
    }
}
