package ma.inetum.restonetbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "RESERVATIONS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NUMERORESERVATION")
    private Integer numeroReservation;

    @Column(name = "REPASARESERVATION")
    private Integer repasReservation;

    @Column(name = "CLIENT")
    private String client;

    @Column(name = "NOM")
    private String nom;

    @Column(name = "SOCIETE")
    private String societe;

    @Column(name = "UNITE")
    private String unite;

    @Column(name = "CATEGORIECLIENT")
    private String categorieClient;

    @Column(name = "MODESAISIE")
    private String modeSaisie;

    @Column(name = "OPERATEUR")
    private String operateur;

    @Temporal(TemporalType.DATE)
    @Column(name = "DATESAISIE")
    private Date dateSaisie;

    @Column(name = "HEURESAISIE")
    private String heureSaisie;

    @Column(name = "MODEVALIDATION")
    private String modeValidation;

    @Temporal(TemporalType.DATE)
    @Column(name = "DATEANNULATION")
    private Date dateAnnulation;

    @Column(name = "HEUREANNULATION")
    private String heureAnnulation;

    @Column(name = "MODEANNULATION")
    private String modeAnnulation;

    @Column(name = "ETATRESERVATION")
    private String etatReservation;

    @Column(name = "NUMEROTICKET")
    private Integer numeroTicket;

    @Column(name = "NUMEROTICKETINVITE")
    private Integer numeroTicketInvite;

    @Column(name = "NOMBREREPAS")
    private Integer nombreRepas;

    @Column(name = "NUMEROPLATEAU")
    private Integer numeroPlateau;

    @Column(name = "FACTURE")
    private String facture;

    @Column(name = "CODESERVICE")
    private String codeService;


    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<DetailReservation> detailReservations = new ArrayList<>();



    public void addDetailReservation(DetailReservation detailReservation) {
        detailReservation.setReservation(this);
        detailReservations.add(detailReservation);
    }

    public void removeDetailReservation(DetailReservation detailReservation) {
        detailReservations.remove(detailReservation);
        detailReservation.setReservation(null);
    }
}