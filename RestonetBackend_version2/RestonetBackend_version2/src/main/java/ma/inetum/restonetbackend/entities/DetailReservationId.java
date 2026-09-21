package ma.inetum.restonetbackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class DetailReservationId implements Serializable {

    @Column(name = "NUMERORESERVATION")
    private Integer numeroReservation;

    @Column(name = "CODEARTICLE")
    private String codeArticle;
}
