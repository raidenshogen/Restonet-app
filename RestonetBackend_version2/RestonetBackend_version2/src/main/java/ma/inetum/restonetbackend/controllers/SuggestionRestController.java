package ma.inetum.restonetbackend.controllers;

import ma.inetum.restonetbackend.entities.Suggestion;
import ma.inetum.restonetbackend.services.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suggestion")
public class SuggestionRestController {
    private final SuggestionService suggestionService;
    @Autowired
    public SuggestionRestController(SuggestionService suggestionService) {
        this.suggestionService = suggestionService;
    }
    @GetMapping("/user-suggestions")
    public ResponseEntity<List<Suggestion>> getSuggestionsByClient(@RequestParam String client) {
        List<Suggestion>sugs= suggestionService.getAllSuggestions(client);
        return ResponseEntity.ok(sugs);
    }
    @PostMapping("/create")
    public ResponseEntity<Suggestion> createSuggestion(@RequestBody Suggestion suggestion) {
        Suggestion sug=suggestionService.CreateSuggestion(suggestion);
        return ResponseEntity.ok(sug);
    }
    @GetMapping("/suggestion-count/{clientId}")
    public ResponseEntity<String> getSuggestionCountByClient(@PathVariable String clientId) {
        String count = suggestionService.getSuggestionCountByClient(clientId);
        return ResponseEntity.ok(count);
    }
}
