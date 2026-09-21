package ma.inetum.restonetbackend.controllers;

import ma.inetum.restonetbackend.dto.ReservationDto;
import ma.inetum.restonetbackend.entities.Reservation;
import ma.inetum.restonetbackend.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
public class ReservationRestController {

    @Autowired
    private final ReservationService reservationService;

    public ReservationRestController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationDto reservationDto) {
        Reservation reservation = reservationService.createReservation(reservationDto);
        return ResponseEntity.ok(reservation);
    }
    @GetMapping("/reservé")
    public Reservation findReservationByRepasAndClient(@RequestParam Integer repasReservation, @RequestParam String client) {
        return reservationService.findReservationByRepasAndClient(repasReservation, client);
    }
    // In your ReservationRestController.java
    @GetMapping("/facture-count/{clientId}")
    public ResponseEntity<String> getFactureCountByClient(@PathVariable String clientId) {
        String count = reservationService.getFactureCountByClient(clientId);
        return ResponseEntity.ok(count);
    }
    /*
    @Autowired
    private final ReservationService reservationService;
    @Autowired
    private final JwtUtils jwtUtils;

    public ReservationController(ReservationService reservationService, JwtUtils jwtUtils) {
        this.reservationService = reservationService;
        this.jwtUtils = jwtUtils;
    }


    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation, @RequestBody List<DetailReservation> detailReservations, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        // Extraire le nom d'utilisateur à partir du token JWT
        String username = jwtUtils.extractUsername(token);
        System.out.println("Nom d'utilisateur : " + username);

        return reservationService.createReservation(reservation, detailReservations);
    }*/
}