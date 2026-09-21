package ma.inetum.restonetbackend.repositories;

import ma.inetum.restonetbackend.entities.Article;
import ma.inetum.restonetbackend.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, String > {
    Optional<Article> findByARTICLE(String article);
    //Optional<Reservation> findById(Integer numeroreservation);

}
