package ma.inetum.restonetbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "ARTICLES")
@NoArgsConstructor
@AllArgsConstructor
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Article implements Serializable {
    @Id
    @Column(name = "ARTICLE")
    private String ARTICLE;
    @Column(name = "LIBELLECOURT")
    private String LIBELLECOURT;
    @Column(name = "NOM")
    private String NOM;
    @Column(name = "FAMILLE")
    private String FAMILLE;
    @Column(name = "PRIXVENTEATVA1")
    private Double PRIXVENTEATVA1;
    @Column(name = "PRIXVENTEATVA2")
    private Double PRIXVENTEATVA2;
    @Column(name = "PRIXVENTEATVA3")
    private Double PRIXVENTEATVA3;
    @OneToMany(mappedBy = "article", fetch = FetchType.EAGER)
    private List<DetailRepasAReservation> repasDetails;


}
