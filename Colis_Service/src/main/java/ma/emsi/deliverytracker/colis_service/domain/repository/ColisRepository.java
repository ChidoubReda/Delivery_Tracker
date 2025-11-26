package ma.emsi.deliverytracker.colis_service.domain.repository;

import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColisRepository extends JpaRepository<Colis, Long> {
}
