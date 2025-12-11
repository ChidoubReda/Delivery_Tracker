package ma.emsi.deliverytracker.colis_service;

import ma.emsi.deliverytracker.colis_service.application.ColisService;
import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import ma.emsi.deliverytracker.colis_service.domain.model.Status;
import ma.emsi.deliverytracker.colis_service.domain.repository.ColisRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
public class ColisServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ColisServiceApplication.class, args);
    }
    @Bean
    public CommandLineRunner commandLineRunner(ColisService colisService, ColisRepository colisRepository) {
        return args -> {
            Colis colis = Colis.builder()
                    .trackingNumber("INIT-TEST-000")
                    .senderName("John Doe")
                    .senderAddress("123 Test Street")
                    .senderEmail("john.doe@mail.com")
                    .recipientName("Jane Smith")
                    .recipientAddress("456 Delivery Road")
                    .recipientEmail("jane.smith@mail.com")
                    .weight(1.5)
                    .status(Status.CREATED)
                    .createdAt(new Date())
                    .updatedAt(new Date())
                    .expectedDeliveryDate(new Date(System.currentTimeMillis() + 3 * 24 * 60 * 60 * 1000)) // 3 days later
                    .build();
            colisRepository.save(colis);
            Colis colis1 = Colis.builder()
                    .trackingNumber("INIT-TEST-001")
                    .senderName("John Doe")
                    .senderAddress("123 Test Street")
                    .senderEmail("john.doe@mail.com")
                    .recipientName("Jane Smith")
                    .recipientAddress("456 Delivery Road")
                    .recipientEmail("jane.smith@mail.com")
                    .weight(1.5)
                    .status(Status.CREATED)
                    .createdAt(new Date())
                    .updatedAt(new Date())
                    .expectedDeliveryDate(new Date(System.currentTimeMillis() + 3 * 24 * 60 * 60 * 1000)) // 3 days later
                    .build();
            colisRepository.save(colis1);
            Colis colis2 = Colis.builder()
                    .trackingNumber("INIT-TEST-002")
                    .senderName("John Doe")
                    .senderAddress("123 Test Street")
                    .senderEmail("john.doe@mail.com")
                    .recipientName("Jane Smith")
                    .recipientAddress("456 Delivery Road")
                    .recipientEmail("jane.smith@mail.com")
                    .weight(1.5)
                    .status(Status.CREATED)
                    .createdAt(new Date())
                    .updatedAt(new Date())
                    .expectedDeliveryDate(new Date(System.currentTimeMillis() + 3 * 24 * 60 * 60 * 1000)) // 3 days later
                    .build();
            colisRepository.save(colis2);
            Colis colis3 = Colis.builder()
                    .trackingNumber("INIT-TEST-003")
                    .senderName("John Doe")
                    .senderAddress("123 Test Street")
                    .senderEmail("john.doe@mail.com")
                    .recipientName("Jane Smith")
                    .recipientAddress("456 Delivery Road")
                    .recipientEmail("jane.smith@mail.com")
                    .weight(1.5)
                    .status(Status.CREATED)
                    .createdAt(new Date())
                    .updatedAt(new Date())
                    .expectedDeliveryDate(new Date(System.currentTimeMillis() + 3 * 24 * 60 * 60 * 1000)) // 3 days later
                    .build();
            colisRepository.save(colis3);

        };
}

}
