package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.dto.ReservationDto;
import ma.inetum.restonetbackend.entities.DetailReservation;
import ma.inetum.restonetbackend.entities.Reservation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReservationService {

    List<Reservation> getAllReservation();

    Reservation getreservationById(Integer numeroreservation );
    Reservation createReservation(ReservationDto reservationDto);
    Reservation findReservationByRepasAndClient(Integer repasReservation, String client);
    String getFactureCountByClient(String clientId);
}
