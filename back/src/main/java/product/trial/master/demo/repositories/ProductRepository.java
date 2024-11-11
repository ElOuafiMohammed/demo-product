package product.trial.master.demo.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import product.trial.master.demo.entities.Product;

import java.util.Optional;

/**
 * Repository is an interface that provides access to data in a database
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByCode(String code);

}