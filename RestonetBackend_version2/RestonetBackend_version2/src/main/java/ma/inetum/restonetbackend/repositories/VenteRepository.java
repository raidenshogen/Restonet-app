package ma.inetum.restonetbackend.repositories;

import ma.inetum.restonetbackend.dto.VentesDto;
import ma.inetum.restonetbackend.entities.Vente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenteRepository extends JpaRepository<Vente, Long> {

    List<Vente> findByClient_Client(String client);
    String countByClient_ClientAndNumeroticketIsNotNull(String client);
}
