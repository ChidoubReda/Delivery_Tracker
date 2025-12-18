package ma.emsi.livraisonservice.config;

import ma.emsi.livraisonservice.domain.model.EtatLivraison;
import ma.emsi.livraisonservice.domain.model.Livraison;
import ma.emsi.livraisonservice.domain.repository.LivraisonRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(LivraisonRepository repository) {
        return args -> {
            // Casablanca Coordinates
            // 1. Maarif: 33.5898, -7.6335
            // 2. Casa Port: 33.5997, -7.6166
            // 3. Sidi Bernoussi: 33.6066, -7.5028
            // 4. Technopark: 33.5518, -7.6601

            if (repository.count() == 0) {
                Livraison l1 = Livraison.builder()
                        .colisId(101L)
                        .adresseDestination("Maarif, Casablanca")
                        .dateCreation(LocalDateTime.now())
                        .dateLivraisonPrevue(LocalDateTime.now().plusHours(2))
                        .etat(EtatLivraison.IN_TRANSIT)
                        .livreurId("LIV-001")
                        .coordinates("33.5898,-7.6335")
                        .build();

                Livraison l2 = Livraison.builder()
                        .colisId(102L)
                        .adresseDestination("Casa Port, Casablanca")
                        .dateCreation(LocalDateTime.now().minusHours(1))
                        .dateLivraisonPrevue(LocalDateTime.now().plusHours(1))
                        .etat(EtatLivraison.IN_TRANSIT)
                        .livreurId("LIV-002")
                        .coordinates("33.5997,-7.6166")
                        .build();

                Livraison l3 = Livraison.builder()
                        .colisId(103L)
                        .adresseDestination("Technopark, Casablanca")
                        .dateCreation(LocalDateTime.now().minusHours(2))
                        .dateLivraisonPrevue(LocalDateTime.now().plusHours(3))
                        .etat(EtatLivraison.IN_TRANSIT)
                        .livreurId("LIV-003")
                        .coordinates("33.5518,-7.6601")
                        .build();

                repository.saveAll(Arrays.asList(l1, l2, l3));
                System.out.println(">>> Données de test injectées : 3 Livraisons à Casablanca");
            }
        };
    }
}
