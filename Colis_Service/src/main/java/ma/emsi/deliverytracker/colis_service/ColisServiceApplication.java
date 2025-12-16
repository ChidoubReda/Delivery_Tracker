package ma.emsi.deliverytracker.colis_service;

import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import ma.emsi.deliverytracker.colis_service.domain.model.Status;
import ma.emsi.deliverytracker.colis_service.domain.repository.ColisRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Date;

@SpringBootApplication
@EnableDiscoveryClient
public class ColisServiceApplication {

        public static void main(String[] args) {
                SpringApplication.run(ColisServiceApplication.class, args);
        }

        @Bean
        public CommandLineRunner commandLineRunner(ColisRepository colisRepository) {
                return args -> {
                        if (colisRepository.count() > 0)
                                return; // Prevent duplicates on restart

                        String[] statuses = { "CREATED", "SHIPPED", "DELIVERED", "RETURNED" };
                        String[] senders = { "Amazon", "Cdiscount", "AliExpress", "Zara", "Fnac" };
                        String[] cities = { "Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir" };

                        for (int i = 0; i < 50; i++) {
                                String status = statuses[i % statuses.length];
                                Colis colis = Colis.builder()
                                                .trackingNumber("TRK-" + (1000 + i))
                                                .senderName(senders[i % senders.length])
                                                .senderAddress("Warehouse " + cities[i % cities.length])
                                                .senderEmail("contact@" + senders[i % senders.length].toLowerCase()
                                                                + ".com")
                                                .recipientName("Client " + i)
                                                .recipientAddress(cities[(i + 1) % cities.length] + " Street, No "
                                                                + (i * 5))
                                                .recipientEmail("client" + i + "@gmail.com")
                                                .weight(1.0 + (i % 10))
                                                .status(Status.valueOf(status))
                                                .createdAt(new Date(System.currentTimeMillis()
                                                                - (long) (Math.random() * 1000000000)))
                                                .updatedAt(new Date())
                                                .expectedDeliveryDate(LocalDate.now().plusDays(i % 5))
                                                .build();
                                colisRepository.save(colis);
                        }
                };
        }

}
