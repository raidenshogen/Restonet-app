package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.Client;
import ma.inetum.restonetbackend.entities.Suggestion;
import ma.inetum.restonetbackend.repositories.ClientRepository;
import ma.inetum.restonetbackend.repositories.SuggestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuggestionServiceImp implements SuggestionService {
    @Autowired
    private SuggestionRepository suggestionRepository;
    @Autowired
    private ClientRepository clientRepository;


    public List<Suggestion> getAllSuggestions(String clientId) {
        Client client = clientRepository.findByClient(clientId);
        if (client == null) {
            throw new RuntimeException("Client not found");
        }
        return suggestionRepository.findByClientId(client);
    }
    public Suggestion CreateSuggestion(Suggestion suggestion) {
        return suggestionRepository.save(suggestion);
    }
    public String getSuggestionCountByClient(String clientId) {
        return suggestionRepository.countByClientId_ClientAndSuggestionIsNotNull(clientId);
    }

}
