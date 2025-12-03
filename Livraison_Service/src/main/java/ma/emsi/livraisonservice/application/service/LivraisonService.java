package ma.emsi.livraisonservice.application.service;

import ma.emsi.livraisonservice.api.dto.LivraisonRequest;
import ma.emsi.livraisonservice.api.dto.LivraisonResponse;
import ma.emsi.livraisonservice.domain.model.EtatLivraison;
import ma.emsi.livraisonservice.domain.model.Livraison;
import ma.emsi.livraisonservice.domain.repository.LivraisonRepository;
import ma.emsi.livraisonservice.infrastructure.client.ColisServiceClient;
import ma.emsi.livraisonservice.infrastructure.client.GeoService;
import ma.emsi.livraisonservice.infrastructure.client.dto.ColisDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LivraisonService {

    private final LivraisonRepository livraisonRepository;
    private final ColisServiceClient colisServiceClient;
    private final GeoService geoService;

    public LivraisonService(LivraisonRepository livraisonRepository, ColisServiceClient colisServiceClient,
            GeoService geoService) {
        this.livraisonRepository = livraisonRepository;
        this.colisServiceClient = colisServiceClient;
        this.geoService = geoService;
    }

    public LivraisonResponse createLivraison(LivraisonRequest request) {
        // 1. Verify Colis exists
        ColisDTO colis = colisServiceClient.getColisById(request.getColisId());
        if (colis == null) {
            throw new RuntimeException("Colis not found with ID: " + request.getColisId());
        }

        // 2. Get Coordinates (just logging or storing for now, maybe in a separate
        // field if Entity had it)
        // For simplicity, we'll just call it to demonstrate usage.
        // In a real app, we might store lat/lon in the entity.
        String coordinates = geoService.getCoordinates(request.getAdresseDestination()).block();

        // 3. Create Entity
        Livraison livraison = Livraison.builder()
                .colisId(request.getColisId())
                .adresseDestination(request.getAdresseDestination())
                .dateCreation(LocalDateTime.now())
                .dateLivraisonPrevue(LocalDateTime.now().plusDays(3)) // Mock logic
                .etat(EtatLivraison.PENDING)
                .livreurId(request.getLivreurId())
                .build();

        Livraison saved = livraisonRepository.save(livraison);

        return mapToResponse(saved, coordinates);
    }

    public List<LivraisonResponse> getAllLivraisons() {
        return livraisonRepository.findAll().stream()
                .map(l -> mapToResponse(l, null))
                .collect(Collectors.toList());
    }

    public LivraisonResponse getLivraisonById(Long id) {
        return livraisonRepository.findById(id)
                .map(l -> mapToResponse(l, null))
                .orElseThrow(() -> new RuntimeException("Livraison not found"));
    }

    private LivraisonResponse mapToResponse(Livraison livraison, String coordinates) {
        return LivraisonResponse.builder()
                .id(livraison.getId())
                .colisId(livraison.getColisId())
                .adresseDestination(livraison.getAdresseDestination())
                .dateCreation(livraison.getDateCreation())
                .dateLivraisonPrevue(livraison.getDateLivraisonPrevue())
                .etat(livraison.getEtat())
                .livreurId(livraison.getLivreurId())
                .coordinates(coordinates)
                .build();
    }
}
