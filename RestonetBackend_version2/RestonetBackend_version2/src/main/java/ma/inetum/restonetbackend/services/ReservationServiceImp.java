package ma.inetum.restonetbackend.services;

import ch.qos.logback.core.CoreConstants;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import ma.inetum.restonetbackend.dto.DetailReservationDto;
import ma.inetum.restonetbackend.dto.ReservationDto;
import ma.inetum.restonetbackend.entities.Article;
import ma.inetum.restonetbackend.entities.DetailRepasAReservation;
import ma.inetum.restonetbackend.entities.DetailReservation;
import ma.inetum.restonetbackend.repositories.ArticleRepository;
import ma.inetum.restonetbackend.repositories.DetailRepasRepository;
import ma.inetum.restonetbackend.repositories.DetailReservationRepository;
import ma.inetum.restonetbackend.repositories.ReservationRepository;
import ma.inetum.restonetbackend.entities.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImp implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private DetailReservationRepository detailReservationRepository;
    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public List<Reservation> getAllReservation() {
       return  reservationRepository.findAll();
    }

    @Override
    public Reservation getreservationById(Integer numeroreservation) {
        return reservationRepository.findById(numeroreservation).get();
    }


//public create reservation(Reservation reservation ){
//reservationRepository.save(reservation);
// }
@Transactional
public Reservation createReservation(ReservationDto reservationDto) {
    // ✅ Validate required fields
    if (reservationDto.getClient() == null || reservationDto.getRepasReservationId() == 0) {
        throw new IllegalArgumentException("Client and repasReservationId are required");
    }

    Reservation reservation = new Reservation();
    reservation.setClient(reservationDto.getClient());
    reservation.setNom(reservationDto.getNom());
    reservation.setSociete(reservationDto.getSociete());
    reservation.setUnite(reservationDto.getUnite());
    reservation.setCategorieClient(reservationDto.getCategorieClient());
    reservation.setModeSaisie(reservationDto.getModeSaisie());
    reservation.setDateSaisie(new Date());
    reservation.setOperateur(reservationDto.getOperateur());
    reservation.setFacture(reservationDto.getFacture());
    reservation.setCodeService(reservationDto.getCodeService());


    // ✅ Format heureSaisie correctly
    LocalTime time = LocalTime.now();
    String heureSaisie = String.format("%02d:%02d", time.getHour(), time.getMinute());
    reservation.setHeureSaisie(heureSaisie);

    reservation.setModeValidation(reservationDto.getModeValidation());
    reservation.setEtatReservation(reservationDto.getEtatReservation());
    reservation.setNombreRepas(reservationDto.getNombreRepas());
    reservation.setRepasReservation(reservationDto.getRepasReservationId());

    // ✅ Save reservation first
    Reservation savedReservation = reservationRepository.save(reservation);

    // ✅ Handle detail reservations
    if (reservationDto.getDetailReservations() != null) {
        for (DetailReservationDto detailDto : reservationDto.getDetailReservations()) {
            if (detailDto.getQuantite() <= 0) continue;

            DetailReservation detail = new DetailReservation();
            detail.setQuantite(detailDto.getQuantite());
            detail.setReservation(savedReservation);

            // ✅ Find Article by ARTICLE code
            Optional<Article> articleOpt = articleRepository.findByARTICLE(detailDto.getCodeArticle());
            if (articleOpt.isPresent()) {
                detail.setArticle(articleOpt.get());
            } else {
                throw new EntityNotFoundException("Article not found: " + detailDto.getCodeArticle());
            }

            // ✅ Save detail
            detailReservationRepository.save(detail);
        }
    }

    return savedReservation;
}

    //check
    @Override
    public Reservation findReservationByRepasAndClient(Integer repasReservation, String client) {
        return reservationRepository.findByRepasReservationAndClientAndEtatReservation(repasReservation, client, "R");
    }
    // In your ReservationServiceImp.java
    @Override
    public String getFactureCountByClient(String clientId) {
        // Count existing reservations with factures for this client
        return reservationRepository.countByClientAndFactureIsNotNull(clientId);
    }
}
