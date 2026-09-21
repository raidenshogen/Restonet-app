package ma.inetum.restonetbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "MODESREGLEMENT")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModeReglement implements Serializable {
    @Id
    @Column(name = "REGLEMENT")
    private String reglement;
    @Column(name = "DESIGNATION")
    private String designation;
    @JsonIgnore
@OneToMany(mappedBy = "modereglement")
    private  List<Vente> ventes = new ArrayList<>();


}