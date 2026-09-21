package ma.inetum.restonetbackend.controllers;

import ma.inetum.restonetbackend.services.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("ResetPassword")
public class PasswordRestController {

        @Autowired
        private PasswordResetService passwordResetService;

        @PostMapping("/reset-password-by-id")
        public ResponseEntity<?> resetPasswordById(@RequestBody Map<String, String> request) {
            try {
                String restoNetId = request.get("restoNetId");
                passwordResetService.resetPasswordByRestoNetId(restoNetId);
                return ResponseEntity.ok(Map.of("message", "Nouveau mot de passe envoyé par email"));
            } catch (Exception e) {
                return ResponseEntity.status(500).body(Map.of("message", "Erreur lors de l'envoi de l'email"));
            }
        }

        @PostMapping("/reset-password-by-email")
        public ResponseEntity<?> resetPasswordByEmail(@RequestBody Map<String, String> request) {
            try {
                String email = request.get("email");
                passwordResetService.resetPasswordByEmail(email);
                return ResponseEntity.ok(Map.of("message", "Nouveau mot de passe envoyé par email"));
            } catch (Exception e) {
                return ResponseEntity.status(500).body(Map.of("message", "Erreur lors de l'envoi de l'email"));
            }
        }
    }

