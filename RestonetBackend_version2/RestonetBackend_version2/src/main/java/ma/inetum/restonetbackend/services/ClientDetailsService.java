package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.Client;
import ma.inetum.restonetbackend.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ClientDetailsService implements UserDetailsService {

    private final ClientRepository clientRepository;
    @Autowired
    public ClientDetailsService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String codeClient) throws UsernameNotFoundException {
        Client client = clientRepository.findByClient(codeClient);
        if (client == null) {
            throw new UsernameNotFoundException("Client not found with matricule: " + codeClient);
        }
        return new ClientDetails(client);
    }
}