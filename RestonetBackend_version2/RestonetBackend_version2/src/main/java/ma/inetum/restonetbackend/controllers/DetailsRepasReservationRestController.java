package ma.inetum.restonetbackend.controllers;


import ma.inetum.restonetbackend.dto.DetailsRepasDto;
import ma.inetum.restonetbackend.entities.DetailRepasAReservation;
import ma.inetum.restonetbackend.services.DetailRepasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class DetailsRepasReservationRestController {
    @Autowired
    private DetailRepasService detailRepasService;

//    @GetMapping("/api/repasreservations/{id}/details")
//    public List<DetailRepasAReservation> getDetailRepasAReservationById(@PathVariable Integer id, HttpServletRequest request) {
//        return detailRepasService.getDetailsRepasByRepasId(id);
//    }
    @GetMapping("api/repasreservations/{id}/details")
    public List<DetailsRepasDto> getDetailsByRepasReservation(@PathVariable("id") Integer id) {
        return detailRepasService.getDetailsByRepasId(id);
    }
}
