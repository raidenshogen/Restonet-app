package ma.inetum.restonetbackend.dto.mapper;

import ma.inetum.restonetbackend.dto.DetailsRepasDto;
import ma.inetum.restonetbackend.entities.DetailRepasAReservation;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DetailsRepasMapper {

        public DetailsRepasDto toDto(DetailRepasAReservation entity) {
            if (entity == null) return null;

            DetailsRepasDto  dto = new DetailsRepasDto();
            dto.setNumerodetail(entity.getNUMERODETAIL());
            dto.setRepasareservation(entity.getREPASARESERVATION());
            dto.setLibellearticle(entity.getLIBELLEARTICLE());

            if (entity.getArticle() != null) {
                dto.setCodeArticle(entity.getArticle().getARTICLE());
                dto.setLibelleCourt(entity.getArticle().getLIBELLECOURT());
                dto.setPrixventeatva1(entity.getArticle().getPRIXVENTEATVA1());

            }

            return dto;
        }
    public List<DetailsRepasDto> toDtoList(List<DetailRepasAReservation> entities) {
        return entities.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
      }
