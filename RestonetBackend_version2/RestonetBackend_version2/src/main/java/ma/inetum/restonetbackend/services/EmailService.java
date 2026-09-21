package ma.inetum.restonetbackend.services;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendPasswordResetEmail(String toEmail, String newPassword, String restoNetId) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("🔐 RestoNet - Nouveau mot de passe");
            helper.setReplyTo(fromEmail);
            helper.setSentDate(new Date());

            // ✅ Better HTML + Text body
            String htmlContent = String.format("""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h2 style="color: #007BFF;">RestoNet</h2>
              <p>Bonjour,</p>
              <p>Votre mot de passe a été réinitialisé avec succès.</p>
              <p><strong>Nouveau mot de passe :</strong> <span style="color: #d9534f;">%s</span></p>
              <p><strong>Identifiant :</strong> %s</p>
              <p><em>Nous vous recommandons de le changer après la première connexion.</em></p>
              <hr>
              <small style="color: #6c757d;">Cet email est généré automatiquement. Merci de ne pas y répondre.</small>
            </div>
            """, newPassword, restoNetId);

            helper.setText(htmlContent, true); // true = HTML

            System.out.println("📧 Sending email to: " + toEmail);
            mailSender.send(message);
            System.out.println("✅ Email sent successfully!");

        } catch (Exception e) {
            System.err.println("❌ Failed to send email: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Échec d'envoi de l'email", e);
        }
    }
}