package ma.inetum.restonetbackend.services;


import io.jsonwebtoken.io.IOException;
import jakarta.persistence.EntityNotFoundException;

import jakarta.transaction.Transactional;
import ma.inetum.restonetbackend.entities.CategorieClient;
import ma.inetum.restonetbackend.entities.Client;
import ma.inetum.restonetbackend.repositories.CategorieClientRepository;
import ma.inetum.restonetbackend.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


@Service
public class ClientService {
  @Autowired
    private ClientRepository clientRepository;

@Transactional
    public boolean changeClientPassword(String clientCode, String newPassword) {
  Client client = clientRepository.findByClient(clientCode);
  if (client != null) {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    String encodedPassword = passwordEncoder.encode(newPassword);
    client.setMotdepasseintranet(encodedPassword);
    //uppdate MDP_CRYPT == O
    client.setMdp_crypte("O");
    clientRepository.save(client);
    return true;
  } else {
    throw new EntityNotFoundException("Client not found with code: " + clientCode);
  }
}
  public boolean isClientPasswordEncrypted(String clientCode) {
    Client client = clientRepository.findByClient(clientCode);
//    if (client != null) {
//      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//      String encodedPassword = passwordEncoder.encode(client.getMotdepasseintranet());
//      return !encodedPassword.equals(client.getMotdepasseintranet());
//    } else { return false;
//  }
    return client != null && client.getMotdepasseintranet().startsWith("$2a$");

  }

  public Client getClientCon(String codeClient){
  return clientRepository.findByClient(codeClient);
  }



  public boolean changeEmail(String clientCode, String newEmail){
  Client client = clientRepository.findByClient(clientCode);
  client.setEmail(newEmail);
  clientRepository.save(client);
  return true;
}

//  @Transactional
//  public boolean changeImage(String clientCode, String base64Image){
//    Client client = clientRepository.findByClient(clientCode);
//    if (client != null) {
//      // Get old image URL for cleanup
//      String oldImageUrl = client.getImageurl();
//
//      // Only delete file if it's a file path (not Base64)
//      if (oldImageUrl != null && !oldImageUrl.isEmpty() &&
//              !oldImageUrl.contains("admin.png") &&
//              !oldImageUrl.startsWith("data:image")) { // Don't try to delete Base64 strings
//        deleteImageFile(oldImageUrl);
//      }
//
//      // Set new image (Base64 string)
//      client.setImageurl(base64Image);
//      clientRepository.save(client);
//
//      System.out.println("✅ Saved Base64 image for client: " + clientCode);
//      System.out.println("🖼️ Base64 length: " + base64Image.length());
//
//      return true;
//    }
//    return false;
//  }
//  private void deleteImageFile(String imageUrl) {
//    try {
//      // Convert URL to file path
//      String filePath = imageUrl.replace("/uploads/client-images/", "uploads/client-images/");
//      Path path = Paths.get(filePath);
//
//      if (Files.exists(path)) {
//        Files.delete(path);
//        System.out.println("🗑️ Deleted old image file: " + filePath);
//      }
//    } catch (IOException e) {
//      System.err.println("❌ Error deleting old image file: " + e.getMessage());
//      // Don't throw exception, just log the error
//    } catch (java.io.IOException e) {
//      throw new RuntimeException(e);
//    }
//  }

//  public String saveUploadedFile(MultipartFile file, String clientCode) {
//    try {
//      // Create uploads directory if it doesn't exist
//      String uploadDir = "uploads/client-images/";
//      Files.createDirectories(Paths.get(uploadDir));
//
//      // Generate unique filename
//      String fileName = clientCode + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
//      String filePath = uploadDir + fileName;
//
//      // Save file
//      Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
//
//      // Return the URL path
//      return "/uploads/client-images/" + fileName;
//
//    } catch (IOException | java.io.IOException e) {
//      throw new RuntimeException("Failed to store file", e);
//    }}


  public String saveImageToAssets(MultipartFile file, String clientCode) {
    try {
      // Define the assets directory path (adjust this to match your project structure)
      String assetsDir = "src/main/resources/static/assets/img/logos/";

      // For Angular frontend, you might want to save to the Angular assets directory
      // String assetsDir = "../reco-administrateurFront_version2/src/assets/img/logos/";

      // Create directory if it doesn't exist
      Files.createDirectories(Paths.get(assetsDir));

      // Generate unique filename with client code
      String fileExtension = getFileExtension(file.getOriginalFilename());
      String fileName = "client_" + clientCode + "_" + System.currentTimeMillis() + fileExtension;
      String filePath = assetsDir + fileName;

      // Save file to the assets directory
      Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

      // Return the relative path that the frontend can use
      String relativePath = "../../../assets/img/logos/" + fileName;

      System.out.println("💾 Image saved to: " + filePath);
      System.out.println("🔗 Relative path for frontend: " + relativePath);

      return relativePath;

    } catch (IOException | java.io.IOException e) {
      throw new RuntimeException("Failed to save image to assets directory", e);
    }
  }

  private String getFileExtension(String filename) {
    if (filename == null || filename.lastIndexOf(".") == -1) {
      return ".jpg"; // default extension
    }
    return filename.substring(filename.lastIndexOf("."));
  }

  @Transactional
  public boolean changeImage(String clientCode, String imagePath) {
    Client client = clientRepository.findByClient(clientCode);
    if (client != null) {
      // Get old image path for cleanup
      String oldImagePath = client.getImageurl();

      // Delete old image file if it exists and it's not the default admin.png
      if (oldImagePath != null && !oldImagePath.isEmpty() &&
              !oldImagePath.contains("admin.png") &&
              !oldImagePath.startsWith("data:image")) { // Don't try to delete Base64 strings
        deleteImageFile(oldImagePath);
      }

      // Set new image path
      client.setImageurl(imagePath);
      clientRepository.save(client);

      System.out.println("✅ Updated client image path: " + imagePath);
      return true;
    }
    return false;
  }

  private void deleteImageFile(String imagePath) {
    try {
      // Convert relative path to actual file path
      String actualPath;
      if (imagePath.startsWith("../../../assets/img/logos/")) {
        // Extract filename from relative path
        String filename = imagePath.substring(imagePath.lastIndexOf("/") + 1);
        actualPath = "src/main/resources/static/assets/img/logos/" + filename;
      } else {
        actualPath = imagePath;
      }

      Path path = Paths.get(actualPath);

      if (Files.exists(path)) {
        Files.delete(path);
        System.out.println("🗑️ Deleted old image file: " + actualPath);
      }
    } catch (IOException | java.io.IOException e) {
      System.err.println("❌ Error deleting old image file: " + e.getMessage());
      // Don't throw exception, just log the error
    }
  }

  public double getApprovisionnement(String client){
  return clientRepository.findByClient(client).getApprovisionnement();
  }

  public void provisionAccount(String email, Double amount) {
    Client client = clientRepository.findByEmail(email);

    if (client == null) {
      throw new IllegalArgumentException("Client not found");
    }

    // Update client balance
    client.setNouveausolde(client.getAnciensolde() + amount);
    clientRepository.save(client);
  }
}





