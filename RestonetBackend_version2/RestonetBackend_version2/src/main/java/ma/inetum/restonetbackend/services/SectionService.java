package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.Section;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SectionService {
    Section getSectionById(String section);

    List<Section> getAllSection();


    //List<RepasReservation> getRepasBySection(String section);


}
