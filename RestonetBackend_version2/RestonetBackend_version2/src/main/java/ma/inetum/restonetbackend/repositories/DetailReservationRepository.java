package ma.inetum.restonetbackend.repositories;

import ma.inetum.restonetbackend.entities.DetailReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailReservationRepository extends JpaRepository<DetailReservation, DetailReservation.Id> {
}