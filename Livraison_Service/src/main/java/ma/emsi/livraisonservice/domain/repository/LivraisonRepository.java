package ma.emsi.livraisonservice.domain.repository;

import ma.emsi.livraisonservice.domain.model.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LivraisonRepository extends JpaRepository<Livraison, Long> {
    List<Livraison> findByColisId(Long colisId);
}
