package ma.inetum.restonetbackend.services;

import ma.inetum.restonetbackend.entities.Article;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ArticleService
{
    List<Article> getAllArticles();
}
