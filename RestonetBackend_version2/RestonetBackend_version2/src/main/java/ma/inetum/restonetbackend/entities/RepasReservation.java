package ma.inetum.restonetbackend.entities;


import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "REPASARESERVATION")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RepasReservation implements Serializable {
    @Id
    @Column(name = "REPASARESERVATION")
    private Integer repasareservation;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "DATEREPAS")
    private Date daterepas;

    @Column(name = "DESIGNATION")
    private String designation;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "DATEDEBUTRESERVATION")
    private Date datedebutreservation;

    @Column(name = "REPASMODELE")
    private Integer repasmodele;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "DATEFINRESERVATION")
    private Date datefinreservation;

    @JoinColumn(name = "CODESERVICE")
    private String codeservice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SECTION")
    private Section section;

}
