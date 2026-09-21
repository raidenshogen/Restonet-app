package ma.inetum.restonetbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section implements Serializable {
    @Id
    @Column(name = "SECTION")
    private String section;
    @Column(name = "DESIGNATION")
    private String designation;

    @Column(name = "FONCTIONNEMENT")
    private String fonctionnement;

    @Column(name = "SERVICEOUVERT")
    private String serviceouvert;

    @Column(name = "GESTIONRESERVATIONS")
    private String gestionreservations;

    @Column(name = "REPASSERVICE")
    private String repasservice;

    @Column(name = "CODESERVICE")
    private String codeservice;

    @JsonIgnore
    @OneToMany(mappedBy = "section")
    private List<RepasReservation> repasList;


    @OneToMany(mappedBy = "section",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Suggestion> suggestionList=new ArrayList<>();

    @Override
    public String toString() {
        return "Section{" +
                "section='" + section + '\'' +
                ", designation='" + designation + '\'' +
                '}';
    }

}
