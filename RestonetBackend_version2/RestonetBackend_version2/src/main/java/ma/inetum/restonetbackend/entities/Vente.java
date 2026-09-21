package ma.inetum.restonetbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ventes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class Vente {
    @Id
    @Column(name = "NUMEROTICKET")
    private String numeroticket;
    @ManyToOne
    @JoinColumn(name = "CLIENT")
    private Client client;
    @ManyToOne
    @JoinColumn(name = "SECTION")
    private Section section;
    @Column(name = "CATEGORIECLIENT")
    private String categorieclient;
    @Column(name = "CATEGORIEINVITANTE")
    private String categorieinvitante;
    @Column(name = "MODEPAIEMENT")
    private String modepaiement;
    @Column(name = "DATESERVICE")
    private String dateservice;
    @Column(name = "CODESERVICE")
    private String codeservice;
    @Column(name = "NUMEROSERVICE")
    private int numeroservice;
    @Column(name = "REPASDESERVICE")
    private String repasdeservice;
    @Column(name = "DATEOPERATION")
    private String dateoperation;
    @Column(name = "HEURE")
    private String heure;
    @Column(name="TYPEOPERATION")
    private String typeoperation;
    @Column(name = "NOMBREREPAS")
    private int nombrerepas;
    @Column(name = "MONTANTPAYE")
    private double montantpaye;
    
    @ManyToOne
    @JoinColumn(name = "MODEREGLEMENT1")
    private ModeReglement modereglement;
    @Column(name = "POINTSATTRIBUES")
    private int pointsattribues;
    @Column(name = "POINTSUTILISES")
    private int pointutilises;
    @Column(name = "ANCIENSOLDE")
    private double anciensolde;
    @Column(name = "NOUVEAUSOLDE")
    private double nouveausolde;
    @Column(name = "ANCIENSOLDEPOINTS")
    private double anciensoldepoints;
    @Column(name = "NOUVEAUSOLDEPOINTS")
    private double nouveausoldepoints;
    @Column(name = "NBIMPTICKET")
    private Integer nbimpticket;



}
