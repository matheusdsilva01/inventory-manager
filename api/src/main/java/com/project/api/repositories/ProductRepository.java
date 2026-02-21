package com.project.api.repositories;

import com.project.api.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    @Query("""
            SELECT DISTINCT p FROM Product p
            JOIN FETCH p.recipe r
            JOIN FETCH r.recipeItems ri
            JOIN FETCH ri.rawMaterial rm
            WHERE NOT EXISTS (
              SELECT 1 FROM RecipeItem ri2
              WHERE ri2.recipe = r
                AND ri2.rawMaterial.quantity < ri2.quantity
            )
            """)
    List<Product> findProducibleProducts();
}
