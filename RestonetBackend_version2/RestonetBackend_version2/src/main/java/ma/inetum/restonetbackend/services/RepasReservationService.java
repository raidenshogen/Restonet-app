package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.RepasReservation;
import ma.inetum.restonetbackend.entities.Section;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RepasReservationService {

    List<RepasReservation> getAllRepasaReservation();

    RepasReservation getrepasById(Integer repasareservation);

   List<RepasReservation> getRepasBySection(Section section) ;



}
