package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.Suggestion;

import java.util.List;

public interface SuggestionService {
     List<Suggestion> getAllSuggestions(String clientId);
    Suggestion CreateSuggestion(Suggestion suggestion);

    String getSuggestionCountByClient(String clientId);
}
