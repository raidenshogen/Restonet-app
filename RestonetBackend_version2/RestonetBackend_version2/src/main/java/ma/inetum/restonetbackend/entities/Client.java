package ma.inetum.restonetbackend.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client implements Serializable {
    @Id
    @Column(name = "CLIENT")
    private String client;
    @Column(name = "MATRICULE")
    private String matricule;
    @Column(name = "BADGE")
    private String badge;
    @Column(name = "NOM")
    private String nom;
    @Column(name = "PRENOM")
    private String prenom;
    @Column(name = "SOCIETE")
    private String societe;
    @Column(name = "UNITE")
    private String unite;
    @Column(name = "CATEGORIECLIENT")
    private String categorieclient;
    @Column(name = "IMAGEURL")
    private String imageurl;
    @Column(name = "DATEDERNIERREPAS")
    private String datedernierrepas;
    @Column(name = "MOTDEPASSEINTRANET")
    private String motdepasseintranet;
    @Column(name = "APPROVISIONNEMENT")
    private Double approvisionnement;
    @Column(name = "ANCIENSOLDE")
    private double anciensolde;
    @Column(name = "NOUVEAUSOLDE")
    private double nouveausolde;
    @Column(name = "APPROVISIONNEMENTPOINTS")
    private Double approvisionnementpoints;
    @Column(name = "ANCIENSOLDEPOINTS")
    private double anciensoldepoints;
    @Column(name = "NOUVEAUSOLDEPOINTS")
    private double nouveausoldepoints;
    @Column(name = "EMAIL")
    private String email;
    @Column(name = "MDP_CRYPTE")
    private String mdp_crypte;

    @JsonIgnore
    @OneToMany(mappedBy = "client")
    private List<Vente> ventes;

    @JsonIgnore
    @OneToMany(mappedBy = "clientId")
    private List<Suggestion>suggestions;
}
