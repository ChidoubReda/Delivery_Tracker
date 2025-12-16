package ma.emsi.livraisonservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

import ma.emsi.livraisonservice.domain.model.EtatLivraison;
import ma.emsi.livraisonservice.domain.model.Livraison;
import ma.emsi.livraisonservice.domain.repository.LivraisonRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
@EnableFeignClients
public class LivraisonServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(LivraisonServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(LivraisonRepository livraisonRepository) {
        return args -> {
            if (livraisonRepository.count() > 0)
                return;

            String[] addresses = { "Casablanca finance city", "Rabat Agdal", "Marrakech Gueliz" };

            for (int i = 0; i < 20; i++) {
                Livraison livraison = Livraison.builder()
                        .colisId(1000L + i) // Sync with Colis IDs
                        .adresseDestination(addresses[i % addresses.length])
                        .dateCreation(LocalDateTime.now().minusDays(i))
                        .dateLivraisonPrevue(LocalDateTime.now().plusDays(2))
                        .etat(i % 3 == 0 ? EtatLivraison.DELIVERED : EtatLivraison.IN_TRANSIT)
                        .livreurId("LIV-" + (100 + i))
                        .coordinates(randomGeo())
                        .build();
                livraisonRepository.save(livraison);
            }
        };
    }

    private String randomGeo() {
        double lat = 33.5731 + (Math.random() - 0.5) * 0.1;
        double lon = -7.5898 + (Math.random() - 0.5) * 0.1;
        return String.format("%.4f, %.4f", lat, lon);
    }
}
