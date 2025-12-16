package ma.emsi.deliverytracker.colis_service.domain.repository;

import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ma.emsi.deliverytracker.colis_service.domain.model.Status;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

// @RepositoryRestResource(path = "colis") // Commented out to prefer manual Controller
public interface ColisRepository extends JpaRepository<Colis, Long> {
    long countByStatus(Status status);
}
