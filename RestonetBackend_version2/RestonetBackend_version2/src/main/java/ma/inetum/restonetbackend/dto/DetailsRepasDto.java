package ma.inetum.restonetbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




public class DetailsRepasDto {
    // DetailRepasDTO.java

        private Integer NUMERODETAIL;
        private Integer REPASARESERVATION;
        private String LIBELLEARTICLE;
        private String codeArticle;
        private String libelleCourt;
        private Double prixventeatva1;

        public DetailsRepasDto() {}

        public DetailsRepasDto(Integer numerodetail, Integer repasareservation, String libellearticle,
                              String codeArticle, String libelleCourt, Double prixventeatva1) {
                this.NUMERODETAIL = numerodetail;
                this.REPASARESERVATION = repasareservation;
                this.LIBELLEARTICLE = libellearticle;
                this.codeArticle = codeArticle;
                this.libelleCourt = libelleCourt;
                this.prixventeatva1 = prixventeatva1;

        }

        // Getters and Setters
        public Integer getNumerodetail() { return NUMERODETAIL; }
        public void setNumerodetail(Integer numerodetail) { this.NUMERODETAIL = numerodetail; }

        public Integer getRepasareservation() { return REPASARESERVATION; }
        public void setRepasareservation(Integer repasareservation) { this.REPASARESERVATION = repasareservation; }

        public String getLibellearticle() { return LIBELLEARTICLE; }
        public void setLibellearticle(String libellearticle) { this.LIBELLEARTICLE = libellearticle; }

        public String getCodeArticle() { return codeArticle; }
        public void setCodeArticle(String codeArticle) { this.codeArticle = codeArticle; }

        public String getLibelleCourt() { return libelleCourt; }
        public void setLibelleCourt(String libelleCourt) { this.libelleCourt = libelleCourt; }

        public Double getPrixventeatva1() { return prixventeatva1; }
        public void setPrixventeatva1(Double prixventeatva1) { this.prixventeatva1 = prixventeatva1; }


}


