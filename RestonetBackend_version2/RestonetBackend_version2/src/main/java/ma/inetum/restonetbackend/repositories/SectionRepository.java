package ma.inetum.restonetbackend.repositories;

import ma.inetum.restonetbackend.entities.Section;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SectionRepository  extends JpaRepository<Section, String > {
    Optional<Section> findBySection(String section);
}
