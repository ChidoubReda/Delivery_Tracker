package ma.emsi.livraisonservice.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.emsi.livraisonservice.domain.model.EtatLivraison;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LivraisonResponse {
    private Long id;
    private Long colisId;
    private String adresseDestination;
    private LocalDateTime dateCreation;
    private LocalDateTime dateLivraisonPrevue;
    private EtatLivraison etat;
    private String livreurId;
    private String coordinates; // Added to show result of GeoService
}
