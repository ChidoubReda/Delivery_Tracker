package ma.emsi.deliverytracker.colis_service.application.consumer;

import ma.emsi.deliverytracker.colis_service.domain.event.LivraisonEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.function.Consumer;

@Configuration
public class LivraisonEventConsumer {

    private static final Logger log = LoggerFactory.getLogger(LivraisonEventConsumer.class);

    @Bean
    public Consumer<LivraisonEvent> livraisonInput() {
        return event -> {
            log.info("Received Livraison Event: ID={}, Status={}", event.getLivraisonId(), event.getStatus());
            // Here we could update the Colis status if needed
        };
    }
}
