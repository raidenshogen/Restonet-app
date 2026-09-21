package ma.inetum.restonetbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ReservationDto {
    private String client;
    private String nom;
    private String societe;
    private String unite;
    private String categorieClient;
    private String modeSaisie;
    private String modeValidation;
    private String etatReservation;
    private String facture;
    private String operateur;
    private int nombreRepas;
    private int repasReservationId;
    private String codeService;
    private List<DetailReservationDto> detailReservations;

}
