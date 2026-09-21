package ma.inetum.restonetbackend.dto.mapper;

import ma.inetum.restonetbackend.dto.DetailReservationDto;
import ma.inetum.restonetbackend.dto.ReservationDto;
import ma.inetum.restonetbackend.entities.DetailReservation;
import ma.inetum.restonetbackend.entities.Reservation;

import java.util.List;
import java.util.stream.Collectors;

public class ReservationDTOMapper {
    public static ReservationDto toDto(Reservation entity) {


        ReservationDto dto = new ReservationDto();
        dto.setClient(entity.getClient());
        dto.setNom(entity.getNom());
        dto.setSociete(entity.getSociete());
        dto.setUnite(entity.getUnite());
        dto.setCategorieClient(entity.getCategorieClient());
        dto.setModeSaisie(entity.getModeSaisie());
        dto.setModeValidation(entity.getModeValidation());
        dto.setEtatReservation(entity.getEtatReservation());
        dto.setNombreRepas(entity.getNombreRepas() != null ? entity.getNombreRepas() : 0);
        dto.setRepasReservationId(entity.getRepasReservation());
        dto.setOperateur(entity.getOperateur());
        dto.setFacture(entity.getFacture());
        dto.setCodeService(entity.getCodeService());
        // Map detail reservations
        if (entity.getDetailReservations() != null) {
            List<DetailReservationDto> detailDtos = entity.getDetailReservations().stream()
                    .map(DetailReservationDTOMapper::toDto)
                    .collect(Collectors.toList());
            dto.setDetailReservations(detailDtos);
        }

        return dto;
    }

    public static Reservation toEntity(ReservationDto dto) {


        Reservation entity = new Reservation();
        entity.setClient(dto.getClient());
        entity.setNom(dto.getNom());
        entity.setSociete(dto.getSociete());
        entity.setUnite(dto.getUnite());
        entity.setCategorieClient(dto.getCategorieClient());
        entity.setModeSaisie(dto.getModeSaisie());
        entity.setModeValidation(dto.getModeValidation());
        entity.setEtatReservation(dto.getEtatReservation());
        entity.setNombreRepas(dto.getNombreRepas());
        entity.setRepasReservation(dto.getRepasReservationId());
        entity.setOperateur(dto.getOperateur());
        entity.setFacture(dto.getFacture());
        entity.setCodeService(dto.getCodeService());
        // Map detail reservations
        if (dto.getDetailReservations() != null) {
            List<DetailReservation> details = dto.getDetailReservations().stream()
                    .map(detailDto -> {
                        DetailReservation detail = DetailReservationDTOMapper.toEntity(detailDto);
                        detail.setReservation(entity);
                        return detail;
                    })
                    .collect(Collectors.toList());
            entity.setDetailReservations(details);
        }

        return entity;
    }
}
