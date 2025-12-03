package ma.emsi.livraisonservice.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Livraison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long colisId;

    private String adresseDestination;

    private LocalDateTime dateCreation;
    private LocalDateTime dateLivraisonPrevue;
    private LocalDateTime dateLivraisonEffective;

    @Enumerated(EnumType.STRING)
    private EtatLivraison etat;

    private String livreurId;
}
