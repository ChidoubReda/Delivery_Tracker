package ma.emsi.livraisonservice.infrastructure.client;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class GeoService {

    private final WebClient webClient;

    public GeoService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://nominatim.openstreetmap.org").build();
    }

    public Mono<String> getCoordinates(String address) {
        return this.webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search")
                        .queryParam("q", address)
                        .queryParam("format", "json")
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }
}
