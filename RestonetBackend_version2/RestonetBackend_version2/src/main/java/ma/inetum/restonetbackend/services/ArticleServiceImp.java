package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.Article;
import ma.inetum.restonetbackend.repositories.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ArticleServiceImp implements ArticleService{

@Autowired
ArticleRepository articleRepository;
    @Override
    public List<Article> getAllArticles() {

            return articleRepository.findAll();

    }

}
