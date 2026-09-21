package ma.inetum.restonetbackend.controllers;

import ma.inetum.restonetbackend.dto.LoginRequest;
import ma.inetum.restonetbackend.services.ClientDetails;
import ma.inetum.restonetbackend.services.ClientDetailsService;
import ma.inetum.restonetbackend.services.ClientService;
import ma.inetum.restonetbackend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthRestController {

    private final AuthenticationManager authenticationManager;
    private final ClientDetailsService clientDetailsService;
    private final ClientService clientService;
//iciii
    private final JwtUtils jwtUtils;
//iciiii
    @Autowired
    public AuthRestController(AuthenticationManager authenticationManager, ClientDetailsService clientDetailsService, ClientService clientService, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.clientDetailsService = clientDetailsService;
        this.clientService = clientService;
        this.jwtUtils = jwtUtils;
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {

//        ClientDetails userDetails;
//        try{
//            userDetails= (ClientDetails) clientDetailsService.loadUserByUsername(loginRequest.getCodeClient());
//
//        }catch (UsernameNotFoundException e){
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//
//        if (!clientService.isClientPasswordEncrypted(userDetails.getUsername()) && loginRequest.getPassword().equals(userDetails.getPassword())) {
//            return ResponseEntity.status(HttpStatus.FOUND).build();
//        } else {
//            try {
//                authenticationManager.authenticate(
//                        new UsernamePasswordAuthenticationToken(loginRequest.getCodeClient(), loginRequest.getPassword())
//                );
//            } catch (AuthenticationException e) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//            }
//            // If authentication succeeds, return user details
//          //  return ResponseEntity.ok(userDetails);
//            //iciiiiiiiiii
//            // If authentication succeeds, generate a JWT token and return user details
//            String token = jwtUtils.generateToken(userDetails);
//            Map<String, Object> response = new HashMap<>();
//            response.put("token", token);
//            response.put("userDetails", userDetails);
//            return ResponseEntity.ok(response);
//            //iciiiiiiiiii
//
//        }
            System.out.println("=== CLIENT LOGIN DEBUG ===");
            System.out.println("Received codeClient: '" + loginRequest.getCodeClient() + "'");
            System.out.println("Received password: '" + loginRequest.getPassword() + "'");
            System.out.println("Password length: " + loginRequest.getPassword().length());

            ClientDetails userDetails;
            try {
                userDetails = (ClientDetails) clientDetailsService.loadUserByUsername(loginRequest.getCodeClient());
                System.out.println("✅ Found user: '" + userDetails.getUsername() + "'");
                System.out.println("Database password: '" + userDetails.getPassword() + "'");
                System.out.println("Database password length: " + userDetails.getPassword().length());
                System.out.println("Passwords equal? " + loginRequest.getPassword().equals(userDetails.getPassword()));
            } catch (UsernameNotFoundException e) {
                System.out.println("❌ User not found: " + e.getMessage());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            boolean isEncrypted = clientService.isClientPasswordEncrypted(userDetails.getUsername());
            System.out.println("Is password encrypted? " + isEncrypted);
            System.out.println("Password starts with $2a$? " + userDetails.getPassword().startsWith("$2a$"));

            if (!isEncrypted && loginRequest.getPassword().equals(userDetails.getPassword())) {
                System.out.println("🔄 SUCCESS: Password match and unencrypted - returning 302");
                return ResponseEntity.status(HttpStatus.FOUND).build();
            } else {
                System.out.println("🔐 Going to Spring Security authentication...");
                System.out.println("Reason: isEncrypted=" + isEncrypted + ", passwordsEqual=" + loginRequest.getPassword().equals(userDetails.getPassword()));

                try {
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(loginRequest.getCodeClient(), loginRequest.getPassword())
                    );
                    System.out.println("✅ Spring Security authentication successful");

                    String token = jwtUtils.generateToken(userDetails);
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", token);
                    response.put("userDetails", userDetails);
                    return ResponseEntity.ok(response);
                } catch (AuthenticationException e) {
                    System.out.println("❌ Spring Security authentication failed: " + e.getMessage());
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
            }
        }


    @PostMapping("/change-password")
//    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> requestBody) {
        String codeClient = requestBody.get("codeClient");
        String newPassword = requestBody.get("newPassword");
        boolean updated = clientService.changeClientPassword(codeClient, newPassword);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

