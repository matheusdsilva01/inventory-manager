package com.project.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="raw_materials")
public class RawMaterial {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String code;
    private Integer quantity;

    @OneToMany(mappedBy = "rawMaterial", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<RecipeItem> recipeItems;
}
