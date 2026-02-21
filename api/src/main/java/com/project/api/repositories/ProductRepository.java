package com.project.api.repositories;

import com.project.api.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    @Query("""
            SELECT p FROM Product p
            WHERE p.recipe IS NOT NULL
              AND (SELECT COUNT(ri) FROM RecipeItem ri WHERE ri.recipe = p.recipe) > 0
              AND NOT EXISTS (
                SELECT ri FROM RecipeItem ri
                WHERE ri.recipe = p.recipe
                  AND ri.rawMaterial.quantity < ri.quantity
              )
            """)
    List<Product> findProducibleProducts();
}
