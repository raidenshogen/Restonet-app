package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.Section;
import ma.inetum.restonetbackend.repositories.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public class SectionServiceImp implements SectionService{
    @Autowired
    SectionRepository sectionRepository;

    @Override
    public Section getSectionById(String section) {
        return sectionRepository.findById(section).get();
    }

    @Override
    public List<Section> getAllSection() {
        return sectionRepository.findAll();
    }

    /*@Override
    public List<RepasReservation> getRepasBySection(String section) {
        Section section1 = sectionRepository.findById(section).get();
        return section1.getRepasReservations();
    }*/
}
