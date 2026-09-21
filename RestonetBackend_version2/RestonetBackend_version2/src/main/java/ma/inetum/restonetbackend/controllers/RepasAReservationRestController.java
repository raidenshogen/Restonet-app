package ma.inetum.restonetbackend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import ma.inetum.restonetbackend.entities.RepasReservation;
import ma.inetum.restonetbackend.entities.Section;
import ma.inetum.restonetbackend.services.RepasReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RepasAReservationRestController {

    @Autowired
    private RepasReservationService repasReservationService;

    @GetMapping("/getRepas")
    public List<RepasReservation> getAllRepasaReservation(HttpServletRequest request) {
        return repasReservationService.getAllRepasaReservation();
    }

    @GetMapping("/getRepasById")/*http://localhost:8080/api/getRepasById?repasareservation=1*/
    public RepasReservation getrepasById(@RequestParam("repasareservation") Integer repasareservation, HttpServletRequest request){
        return repasReservationService.getrepasById(repasareservation);
    }

      @GetMapping("/getRepasBySection")/*http://localhost:8080/api/getRepasBySection?section=01*/
     public List<RepasReservation> getRepasBySection(@RequestParam("section") Section section, HttpServletRequest request) {
          System.out.println("Received section: " + section);
        return repasReservationService.getRepasBySection(section);
     }


}
