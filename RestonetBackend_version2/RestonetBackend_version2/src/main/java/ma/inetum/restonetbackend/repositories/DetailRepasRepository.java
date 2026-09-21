package ma.inetum.restonetbackend.repositories;

import ma.inetum.restonetbackend.dto.DetailsRepasDto;
import ma.inetum.restonetbackend.entities.DetailRepasAReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailRepasRepository extends JpaRepository<DetailRepasAReservation, String > {
    List<DetailRepasAReservation> findByREPASARESERVATION(Integer repasareservation);

}
