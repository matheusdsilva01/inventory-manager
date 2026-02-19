package com.project.api.services;

import com.project.api.dto.RawMaterialDTO;
import com.project.api.models.RawMaterial;
import com.project.api.repositories.RawMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public RawMaterial createRawMaterial(RawMaterialDTO rawMaterial) {
        return repository.save(rawMaterial.toRawMaterial());
    }
}
