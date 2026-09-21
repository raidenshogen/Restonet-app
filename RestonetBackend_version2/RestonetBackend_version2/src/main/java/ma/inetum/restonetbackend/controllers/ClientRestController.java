package ma.inetum.restonetbackend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import ma.inetum.restonetbackend.entities.Client;
import ma.inetum.restonetbackend.services.ClientService;
import ma.inetum.restonetbackend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/clients")
public class ClientRestController {

    private final ClientService clientService;
    private final JwtUtils jwtUtils;

    @Autowired
    public ClientRestController(ClientService clientService, JwtUtils jwtUtils) {
        this.clientService = clientService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/infosCompte")
    public ResponseEntity<Client> getLoggedInClient(HttpServletRequest request) {
        // Récupérer le token JWT à partir de l'en-tête Authorization de la requête HTTP
        String token = request.getHeader("Authorization").substring(7);

        // Extraire le nom d'utilisateur à partir du token JWT
        String username = jwtUtils.extractUsername(token);
        //  System.out.println("Nom d'utilisateur : " + username);

        Client client = clientService.getClientCon(username);

        return ResponseEntity.ok(client);
    }
    // Add this method to ClientRestController

    @PutMapping("/changeEmail")
    public ResponseEntity<String> changeEmail(HttpServletRequest request, @RequestBody String emailData) {
        String token = request.getHeader("Authorization").substring(7);
        String codeClient = jwtUtils.extractUsername(token);
        boolean success = clientService.changeEmail(codeClient, emailData);
        if (success) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/changeImage")
    public ResponseEntity<String> changeImageUrl(HttpServletRequest request, @RequestBody String imageUrl) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            String codeClient = jwtUtils.extractUsername(token);

            System.out.println(" Changing image for client: " + codeClient);
            System.out.println(" Received image data type: " +
                    (imageUrl.startsWith("data:image") ? "Base64" : "URL"));

            boolean success = clientService.changeImage(codeClient, imageUrl);

            if (success) {
                System.out.println(" Image updated successfully");
                return ResponseEntity.ok("Image updated successfully");
            } else {
                System.out.println("Failed to update image");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error updating image: " + e.getMessage());
            e.printStackTrace(); // Add this to see the full error
            return ResponseEntity.status(500).body("Error updating image: " + e.getMessage());
        }
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<Map<String, String>> uploadImage(
            HttpServletRequest request,
            @RequestParam("imageFile") MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Please select a file to upload"));
            }

            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Only image files are allowed"));
            }

            // Get client code from JWT token
            String token = request.getHeader("Authorization");
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(401)
                        .body(Map.of("error", "Missing or invalid authorization token"));
            }

            String jwtToken = token.substring(7);
            String clientCode = jwtUtils.extractUsername(jwtToken);

            System.out.println("🔍 Uploading image for client: " + clientCode);
            System.out.println("📁 File details: " + file.getOriginalFilename() + " (" + file.getSize() + " bytes)");

            // Save file and get the clean path (no quotes!)
            String imagePath = clientService.saveImageToAssets(file, clientCode);

            // Update client record with the new image path
            boolean success = clientService.changeImage(clientCode, imagePath);

            if (success) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Image uploaded successfully");
                response.put("imagePath", imagePath); // Clean path without quotes
                response.put("imageUrl", imagePath);  // Alternative key name

                System.out.println(" Image uploaded and saved at: " + imagePath);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404)
                        .body(Map.of("error", "Client not found"));
            }

        } catch (Exception e) {
            System.err.println(" Error uploading image: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Error uploading image: " + e.getMessage()));
        }
    }

    @PostMapping("/provision")
    public ResponseEntity<?> provisionAccount(@RequestBody Map<String, Object> request) {
        String email = (String) request.get("email");
        Double amount = (Double) request.get("amount");

        try {
            clientService.provisionAccount(email, amount);
            return ResponseEntity.ok("Account provisioned successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

}







