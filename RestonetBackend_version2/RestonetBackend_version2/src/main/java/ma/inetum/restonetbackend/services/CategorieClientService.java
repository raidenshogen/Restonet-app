package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.CategorieClient;
import ma.inetum.restonetbackend.repositories.CategorieClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieClientService {
    @Autowired
    private CategorieClientRepository categorieClientRepository;

    public List<CategorieClient> getCatData() {
        return categorieClientRepository.findAll();
    }
}
