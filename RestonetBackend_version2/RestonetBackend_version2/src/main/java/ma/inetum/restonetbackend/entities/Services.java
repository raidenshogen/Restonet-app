package ma.inetum.restonetbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "SERVICES")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Services {
    @Id
    @Column(name = "CLEPRIMAIRE")
    private Integer serviceId;

    @Column(name = "CODESERVICE")
    private String codeservice;

    @Column(name = "REPASSERVICE")
    private String repasservice;

//    @ManyToOne(fetch = FetchType.LAZY)// ou bien ManyToMany
    @JoinColumn(name = "SECTION")
    private String section;
}
