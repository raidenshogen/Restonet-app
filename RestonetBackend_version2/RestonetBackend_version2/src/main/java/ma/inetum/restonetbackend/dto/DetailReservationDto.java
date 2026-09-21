package ma.inetum.restonetbackend.dto;

public class DetailReservationDto {

        private String codeArticle;
        private int quantite;

        // getters and setters

    public String getCodeArticle() {
        return codeArticle;
    }

    public void setCodeArticle(String codeArticle) {
        this.codeArticle = codeArticle;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}
