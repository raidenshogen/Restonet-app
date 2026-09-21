package ma.inetum.restonetbackend.services;
import ma.inetum.restonetbackend.entities.RepasReservation;
import ma.inetum.restonetbackend.entities.Section;
import ma.inetum.restonetbackend.repositories.RepasReservationRepository;
import ma.inetum.restonetbackend.repositories.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepasReservationServiceImp implements  RepasReservationService{

@Autowired
RepasReservationRepository repasReservationRepository;
@Autowired
SectionRepository sectionRepository;
    @Override
    public List<RepasReservation> getAllRepasaReservation() {
        return repasReservationRepository.findAll();
    }

    @Override
    public RepasReservation getrepasById(Integer repasareservation) {
        return repasReservationRepository.findById(repasareservation).get();
    }

    public List<RepasReservation>getRepasBySection(Section section) {
        return repasReservationRepository.findBySection(section);
    }

}
