package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.dto.DetailsRepasDto;
import ma.inetum.restonetbackend.entities.Article;
import ma.inetum.restonetbackend.entities.DetailRepasAReservation;
import ma.inetum.restonetbackend.repositories.ArticleRepository;
import ma.inetum.restonetbackend.repositories.DetailRepasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DetailRepasService {
    @Autowired
    private DetailRepasRepository detailRepasRepository;
    @Autowired
    private ArticleRepository articleRepository;
    @Transactional(readOnly = true)
    public List<DetailRepasAReservation> getDetailsRepasByRepasId(Integer repasId) {
        List<DetailRepasAReservation> details = detailRepasRepository.findByREPASARESERVATION(repasId);

//        details.forEach(detail -> {
//            String codeArticle = detail.getCODEARTICLE();
//            Article article = articleRepository.findByARTICLE(codeArticle);
//            if (article != null) {
//                article.setPRIXVENTEATVA1(article.getPRIXVENTEATVA1() + 10.0); // Add 10 to the price as an example
//                detail.setArticle(article);
//            }
//        });

        return details;
    }
    public List<DetailsRepasDto> getDetailsByRepasId(Integer repasareservation) {
        return detailRepasRepository.findByREPASARESERVATION(repasareservation).stream()
                .map(detail -> {
                    DetailsRepasDto dto = new DetailsRepasDto();
                    dto.setNumerodetail(detail.getNUMERODETAIL());
                    dto.setRepasareservation(detail.getREPASARESERVATION());
                    dto.setLibellearticle(detail.getLIBELLEARTICLE());
                    Article article = detail.getArticle();
                    if (article != null) {
                        dto.setCodeArticle(article.getARTICLE());
                        dto.setLibelleCourt(article.getLIBELLECOURT());
                        dto.setPrixventeatva1(article.getPRIXVENTEATVA1());
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

}

