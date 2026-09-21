package ma.inetum.restonetbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jdk.jfr.Timespan;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "DETAILSREPASARESERVATION")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DetailRepasAReservation implements Serializable {

    @Id
    @Column(name = "NUMERODETAIL")
    private Integer NUMERODETAIL;

    @Column(name = "REPASARESERVATION")
    private Integer REPASARESERVATION;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "CODEARTICLE", referencedColumnName = "ARTICLE")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Article article;

    @Column(name = "LIBELLEARTICLE")
    private String LIBELLEARTICLE;

//    @Temporal(TemporalType.DATE)
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    @Column(name = "DATEREPAS")
//    private Date DATEREPAS;


//    private String PlatparDefeaut;

}
