package ma.emsi.deliverytracker.colis_service.domain.repository;

import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "colis")
public interface ColisRepository extends JpaRepository<Colis, Long> {
}
