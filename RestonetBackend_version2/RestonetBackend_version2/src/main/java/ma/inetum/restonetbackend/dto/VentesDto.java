package ma.inetum.restonetbackend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import ma.inetum.restonetbackend.entities.Client;
import ma.inetum.restonetbackend.entities.ModeReglement;
import ma.inetum.restonetbackend.entities.Section;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VentesDto {
    private String numeroticket;
    private Section section;
    private Client client;
    private String repasdeservice;
    private String dateoperation;
    private String heure;
    private String typeoperation;
    private int nombrerepas;
    private double montantpaye;
    private ModeReglement modereglement;
    private double anciensolde;
    private double nouveausolde;


}
