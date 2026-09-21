package ma.inetum.restonetbackend.dto.mapper;
import ma.inetum.restonetbackend.dto.VentesDto;
import ma.inetum.restonetbackend.entities.Client;
import ma.inetum.restonetbackend.entities.ModeReglement;
import ma.inetum.restonetbackend.entities.Section;
import ma.inetum.restonetbackend.entities.Vente;

import java.util.List;
import java.util.stream.Collectors;

public class VentesDtoMapper {

    // ✅ Vente Entity → VentesDto
    public static VentesDto toDto(Vente vente) {
        if (vente == null) return null;

        VentesDto dto = new VentesDto();
        dto.setNumeroticket(vente.getNumeroticket());
        dto.setSection(vente.getSection());
        dto.setClient(vente.getClient());
        dto.setRepasdeservice(vente.getRepasdeservice());
        dto.setDateoperation(vente.getDateoperation());
        dto.setHeure(vente.getHeure());
        dto.setTypeoperation(vente.getTypeoperation());
        dto.setNombrerepas(vente.getNombrerepas());
        dto.setMontantpaye(vente.getMontantpaye());
        dto.setModereglement(vente.getModereglement());
        dto.setAnciensolde(vente.getAnciensolde());
        dto.setNouveausolde(vente.getNouveausolde());

        return dto;
    }

    // ✅ VentesDto → Vente Entity
    public static Vente toEntity(VentesDto dto) {
        if (dto == null) return null;

        Vente vente = new Vente();
        vente.setNumeroticket(dto.getNumeroticket());
        vente.setSection(dto.getSection());
        vente.setClient(dto.getClient());
        vente.setRepasdeservice(dto.getRepasdeservice());
        vente.setDateoperation(dto.getDateoperation());
        vente.setHeure(dto.getHeure());
        vente.setTypeoperation(dto.getTypeoperation());
        vente.setNombrerepas(dto.getNombrerepas());
        vente.setMontantpaye(dto.getMontantpaye());
        vente.setModereglement(dto.getModereglement());
        vente.setAnciensolde(dto.getAnciensolde());
        vente.setNouveausolde(dto.getNouveausolde());

        return vente;
    }

    // ✅ List<Vente> → List<VentesDto>
    public static List<VentesDto> toDtoList(List<Vente> ventes) {
        return ventes.stream()
                .map(VentesDtoMapper::toDto)
                .collect(Collectors.toList());
    }

    // ✅ List<VentesDto> → List<Vente>
    public static List<Vente> toEntityList(List<VentesDto> dtos) {
        return dtos.stream()
                .map(VentesDtoMapper::toEntity)
                .collect(Collectors.toList());
    }
}