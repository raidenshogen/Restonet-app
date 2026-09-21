package ma.inetum.restonetbackend.repositories;

import ma.inetum.restonetbackend.entities.Client;
import ma.inetum.restonetbackend.entities.Suggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SuggestionRepository extends JpaRepository<Suggestion, Integer> {

    List<Suggestion> findByClientId(Client client);
    String countByClientId_ClientAndSuggestionIsNotNull(String clientId);

}
