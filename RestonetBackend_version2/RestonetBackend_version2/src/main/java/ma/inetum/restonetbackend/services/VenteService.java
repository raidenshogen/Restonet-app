package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.dto.VentesDto;
import ma.inetum.restonetbackend.dto.mapper.VentesDtoMapper;
import ma.inetum.restonetbackend.entities.Section;
import ma.inetum.restonetbackend.entities.Vente;
import ma.inetum.restonetbackend.repositories.RepasReservationRepository;
import ma.inetum.restonetbackend.repositories.SectionRepository;
import ma.inetum.restonetbackend.repositories.VenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Service
public class VenteService {
    private final VenteRepository venteRepository;
    private final SectionRepository sectionRepository;
    @Autowired
    public VenteService(VenteRepository venteRepository, SectionRepository sectionRepository) {
        this.venteRepository = venteRepository;
        this.sectionRepository=sectionRepository;
    }
    @Transactional(readOnly = true)
    public List<Vente> getVentesForUser(String codeClient) {
        return venteRepository.findByClient_Client(codeClient);
    }


    @Transactional
    public Vente createMovement(VentesDto ventesDto) {


        try {
            // ✅ Basic validation
            if (ventesDto.getClient() == null) {
                throw new IllegalArgumentException("Client is required");
            }


            Vente vente = new Vente();

            // ✅ Map direct fields from DTO
            vente.setNumeroticket(ventesDto.getNumeroticket());
            vente.setClient(ventesDto.getClient());
            vente.setRepasdeservice(ventesDto.getRepasdeservice());
            vente.setDateoperation(ventesDto.getDateoperation());
            vente.setHeure(ventesDto.getHeure());
            vente.setTypeoperation(ventesDto.getTypeoperation());
            vente.setNombrerepas(ventesDto.getNombrerepas());
            vente.setMontantpaye(ventesDto.getMontantpaye());
            vente.setAnciensolde(ventesDto.getAnciensolde());
            vente.setNouveausolde(ventesDto.getNouveausolde());
            vente.setModereglement(ventesDto.getModereglement());
            // ✅ Handle Section - find existing or create new one
            if (ventesDto.getSection() != null) {
                String sectionCode = ventesDto.getSection().getSection(); // Extract string code

                Section section = sectionRepository.findBySection(sectionCode)
                        .orElseGet(() -> {
                            Section newSection = new Section();
                            newSection.setSection(sectionCode);
                            newSection.setDesignation(ventesDto.getSection().getDesignation());
                            return sectionRepository.save(newSection);
                        });
                vente.setSection(section);
            }

            // ✅ Handle ModeReglement - keep it simple, no entity lookup needed
            vente.setModepaiement(ventesDto.getModereglement().getDesignation()); // Store as string in modepaiement field
            vente.setModereglement(null); // Leave the entity reference as null for now

            // ✅ Set reasonable defaults for required fields
            vente.setCategorieclient("CLIENT");
            vente.setDateservice(ventesDto.getDateoperation());
            vente.setCodeservice(vente.getCodeservice());
            vente.setNumeroservice(vente.getNumeroservice());
            vente.setPointsattribues(0);
            vente.setPointutilises(0);
            vente.setAnciensoldepoints(0.0);
            vente.setNouveausoldepoints(0.0);
            vente.setNbimpticket(vente.getNbimpticket());
            vente.setModereglement(null);

            System.out.println("✅ Saving Vente: " + vente.getNumeroticket() + " for section: " + ventesDto.getSection());

            Vente savedVente = venteRepository.save(vente);
            System.out.println("✅ Vente saved successfully: " + savedVente.getNumeroticket());
            return savedVente;

        } catch (Exception e) {
            System.err.println("❌ Error creating movement: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to create movement: " + e.getMessage(), e);
        }
    }


    public String getTicketCountByClient(String clientId) {
        return venteRepository.countByClient_ClientAndNumeroticketIsNotNull(clientId);
    }



}
