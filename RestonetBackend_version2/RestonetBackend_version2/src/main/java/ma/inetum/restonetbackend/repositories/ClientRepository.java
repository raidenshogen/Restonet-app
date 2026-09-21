package ma.inetum.restonetbackend.repositories;

import ma.inetum.restonetbackend.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository  extends JpaRepository<Client, String> {
    Client findByClient(String client);
       Client findByEmail(String email);
}
