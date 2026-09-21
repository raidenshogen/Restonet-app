package ma.inetum.restonetbackend.controllers;

import ma.inetum.restonetbackend.entities.Section;
import ma.inetum.restonetbackend.services.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SectionRestController {

    @Autowired
    private SectionService sectionService;

    @GetMapping("/getSections")
    public  List<Section> getAllSection() {
        return sectionService.getAllSection();
    }

    @GetMapping("/getSectionById")/*http://localhost:8080/api/getSectionById?section=01*/
    public Section getSectionById(@RequestParam("section") String section) {
        return sectionService.getSectionById(section);
    }

    /*@GetMapping("/RepasparSectionId")/*http://localhost:8080/api/RepasparSectionId?id=01*/
    /*public List<RepasReservation> RepasparSectionId(@RequestParam("section") String section) {
        return sectionService.getRepasBySection(section);
    }*/


}
