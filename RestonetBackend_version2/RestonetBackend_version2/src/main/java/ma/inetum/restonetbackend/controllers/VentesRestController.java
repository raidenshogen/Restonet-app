package ma.inetum.restonetbackend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import ma.inetum.restonetbackend.dto.VentesDto;
import ma.inetum.restonetbackend.entities.Vente;
import ma.inetum.restonetbackend.services.VenteService;
import ma.inetum.restonetbackend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ventes")
public class VentesRestController {
    private final VenteService venteService;
    private final JwtUtils jwtUtils;

    @Autowired
    public VentesRestController(VenteService venteService, JwtUtils jwtUtils) {
        this.venteService = venteService;
        this.jwtUtils = jwtUtils;
    }
    @GetMapping("/user")
    public ResponseEntity<List<Vente>> getVentesForCurrentUser(HttpServletRequest request) {
        // Récupérer le token JWT à partir de l'en-tête Authorization de la requête HTTP
        String token = request.getHeader("Authorization").substring(7);

        // Extraire le nom d'utilisateur à partir du token JWT
        String username = jwtUtils.extractUsername(token);
        System.out.println("Nom d'utilisateur : " + username);

        // Récupérer les ventes pour cet utilisateur
        List<Vente> ventes = venteService.getVentesForUser(username);

        // Retourner les ventes
        return ResponseEntity.ok(ventes);
    }
//
@PostMapping("/mouvements")
public ResponseEntity<Vente> createVente(@RequestBody VentesDto venteDto) {
    Vente saved = venteService.createMovement(venteDto);
    return ResponseEntity.ok(saved);
}
    @GetMapping("/ticket-count/{clientId}")
    public ResponseEntity<String> getTicketCountByClient(@PathVariable String clientId) {
        String count = venteService.getTicketCountByClient(clientId);
        return ResponseEntity.ok(count);
    }


}