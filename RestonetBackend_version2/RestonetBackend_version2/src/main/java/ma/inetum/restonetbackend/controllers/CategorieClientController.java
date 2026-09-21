package ma.inetum.restonetbackend.controllers;

import ma.inetum.restonetbackend.entities.CategorieClient;
import ma.inetum.restonetbackend.services.CategorieClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategorieClientController {
    @Autowired
    private CategorieClientService dbService;

    @GetMapping
    public List<CategorieClient> getCatData() {
        return dbService.getCatData();
    }
}
