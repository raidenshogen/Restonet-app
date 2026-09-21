package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.Client;
import ma.inetum.restonetbackend.exceptions.UserNotFoundException;
import ma.inetum.restonetbackend.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@Transactional
public class PasswordResetService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public void resetPasswordByRestoNetId(String restoNetId) throws UserNotFoundException {
        // Your repository returns Client or null
        Client client = clientRepository.findByClient(restoNetId);

        if (client == null) {
            throw new UserNotFoundException("RestoNet ID not found: " + restoNetId);
        }

        if (client.getEmail() == null || client.getEmail().isEmpty()) {
            throw new UserNotFoundException("No email associated with this RestoNet ID");
        }

        String newPassword = generateNewPassword();
        client.setMotdepasseintranet(passwordEncoder.encode(newPassword));
        clientRepository.save(client);

        emailService.sendPasswordResetEmail(client.getEmail(), newPassword, client.getClient());
    }

    public void resetPasswordByEmail(String email) throws UserNotFoundException {
        // Your repository returns Client or null
        Client client = clientRepository.findByEmail(email);

        if (client == null) {
            throw new UserNotFoundException("Email not found: " + email);
        }

        String newPassword = generateNewPassword();
        client.setMotdepasseintranet(passwordEncoder.encode(newPassword));
        clientRepository.save(client);

        emailService.sendPasswordResetEmail(email, newPassword, client.getClient());
    }

    private String generateNewPassword() {
        String upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCase = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialChars = "!@#$%";
        String allChars = upperCase + lowerCase + numbers + specialChars;

        Random random = new Random();
        StringBuilder password = new StringBuilder();

        // Ensure at least one of each type
        password.append(upperCase.charAt(random.nextInt(upperCase.length())));
        password.append(lowerCase.charAt(random.nextInt(lowerCase.length())));
        password.append(numbers.charAt(random.nextInt(numbers.length())));
        password.append(specialChars.charAt(random.nextInt(specialChars.length())));

        // Fill the rest randomly
        for (int i = 4; i < 8; i++) {
            password.append(allChars.charAt(random.nextInt(allChars.length())));
        }

        return shuffleString(password.toString());
    }

    private String shuffleString(String input) {
        char[] chars = input.toCharArray();
        Random random = new Random();
        for (int i = chars.length - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            char temp = chars[i];
            chars[i] = chars[j];
            chars[j] = temp;
        }
        return new String(chars);
    }
}