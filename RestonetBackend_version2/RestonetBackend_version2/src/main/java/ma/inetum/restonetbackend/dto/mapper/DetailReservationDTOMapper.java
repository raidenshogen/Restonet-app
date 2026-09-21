package ma.inetum.restonetbackend.dto.mapper;

import ma.inetum.restonetbackend.dto.DetailReservationDto;
import ma.inetum.restonetbackend.entities.DetailReservation;

public class DetailReservationDTOMapper {
    public static DetailReservationDto toDto(DetailReservation entity) {
        if (entity == null) {
            return null;
        }

        DetailReservationDto dto = new DetailReservationDto();
        dto.setCodeArticle(entity.getId().getCodeArticle());
        dto.setQuantite(entity.getQuantite());
        return dto;
    }

    public static DetailReservation toEntity(DetailReservationDto dto) {
        if (dto == null) {
            return null;
        }

        DetailReservation entity = new DetailReservation();
        entity.getId().setCodeArticle(dto.getCodeArticle());
        entity.setQuantite(dto.getQuantite());
        return entity;
    }
}
