package ma.inetum.restonetbackend.repositories;


import ma.inetum.restonetbackend.entities.RepasReservation;
import ma.inetum.restonetbackend.entities.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface RepasReservationRepository extends JpaRepository<RepasReservation, Integer > {
   List<RepasReservation> findBySection(Section section);
}