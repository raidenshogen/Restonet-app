package ma.inetum.restonetbackend.entities;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "DETAILSRESERVATIONS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailReservation {
    @Embeddable
    public static class Id implements Serializable {
        private Integer numeroReservation;
        @Getter
        @Setter
        private String codeArticle;

        // Constructors, getters, setters, and equals/hashCode methods
    }

    @EmbeddedId
    private Id id = new Id();
@Column(name = "QUANTITE")
    private int quantite;

    @ManyToOne
    @MapsId("numeroReservation")
    @JoinColumn(name = "NUMERORESERVATION")
    private Reservation reservation;


    @ManyToOne
    @MapsId("codeArticle")
    @JoinColumn(name = "CODEARTICLE")
    private Article article;
}

