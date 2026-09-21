package ma.inetum.restonetbackend.repositories;

import ma.inetum.restonetbackend.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer > {
    Reservation findByRepasReservationAndClientAndEtatReservation(Integer repasReservation, String client, String etatReservation);

    String countByClientAndFactureIsNotNull(String clientId);
}
