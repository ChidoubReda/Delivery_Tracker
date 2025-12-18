package ma.emsi.livraisonservice.application.service;

import ma.emsi.livraisonservice.api.dto.LivraisonRequest;
import ma.emsi.livraisonservice.api.dto.LivraisonResponse;
import ma.emsi.livraisonservice.domain.event.LivraisonEvent;
import ma.emsi.livraisonservice.domain.model.EtatLivraison;
import ma.emsi.livraisonservice.domain.model.Livraison;
import ma.emsi.livraisonservice.domain.repository.LivraisonRepository;
import ma.emsi.livraisonservice.infrastructure.client.ColisServiceClient;
import ma.emsi.livraisonservice.infrastructure.client.GeoService;
import ma.emsi.livraisonservice.infrastructure.client.dto.ColisDTO;
import ma.emsi.livraisonservice.application.mapper.LivraisonMapper;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LivraisonService {

    private final LivraisonRepository livraisonRepository;
    private final ColisServiceClient colisServiceClient;
    private final GeoService geoService;
    private final LivraisonMapper livraisonMapper;
    private final StreamBridge streamBridge;

    public LivraisonService(LivraisonRepository livraisonRepository, ColisServiceClient colisServiceClient,
            GeoService geoService, LivraisonMapper livraisonMapper, StreamBridge streamBridge) {
        this.livraisonRepository = livraisonRepository;
        this.colisServiceClient = colisServiceClient;
        this.geoService = geoService;
        this.livraisonMapper = livraisonMapper;
        this.streamBridge = streamBridge;
    }

    public LivraisonResponse createLivraison(LivraisonRequest request) {
        // 1. Verify Colis exists
        ColisDTO colis = colisServiceClient.getColisById(request.getColisId());
        if (colis == null) {
            throw new RuntimeException("Colis not found with ID: " + request.getColisId());
        }

        // 2. Get Coordinates
        String coordinates = geoService.getCoordinates(request.getAdresseDestination()).block();

        // 3. Create Entity
        Livraison livraison = livraisonMapper.toEntity(request);
        livraison.setDateCreation(LocalDateTime.now());
        livraison.setEtat(EtatLivraison.PENDING);
        livraison.setCoordinates(coordinates); // Persist the coordinates!

        Livraison savedLivraison = livraisonRepository.save(livraison);

        // 4. Publish Event (Async communication)
        LivraisonEvent event = LivraisonEvent.builder()
                .livraisonId(savedLivraison.getId())
                .status(savedLivraison.getEtat().name())
                .build();

        streamBridge.send("livraisonOutput-out-0", event);

        return livraisonMapper.toResponse(savedLivraison);
    }

    public List<LivraisonResponse> getAllLivraisons() {
        List<Livraison> livraisons = livraisonRepository.findAll();
        // Debug Log
        livraisons
                .forEach(l -> System.out.println("DEBUG Service: ID=" + l.getId() + ", Coords=" + l.getCoordinates()));

        return livraisons.stream()
                .map(l -> livraisonMapper.toResponse(l))
                .collect(Collectors.toList());
    }

    public LivraisonResponse getLivraisonById(Long id) {
        return livraisonRepository.findById(id)
                .map(l -> livraisonMapper.toResponse(l)) // Use stored coordinates via entity
                .orElseThrow(() -> new RuntimeException("Livraison not found"));
    }
}
