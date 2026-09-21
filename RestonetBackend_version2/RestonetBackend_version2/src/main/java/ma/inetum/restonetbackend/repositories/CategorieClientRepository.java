package ma.inetum.restonetbackend.repositories;

import ma.inetum.restonetbackend.entities.CategorieClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorieClientRepository extends JpaRepository<CategorieClient, Long> {
}
