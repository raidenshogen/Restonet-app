package ma.inetum.restonetbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categoriesclient")
@Data @NoArgsConstructor @AllArgsConstructor
public class CategorieClient {

    @Id
    @Column(name = "categorieclient")
    private String categorieClient;

    @Column(name = "nom")
    private String nom;

}