package ma.emsi.deliverytracker.colis_service.application;

import ma.emsi.deliverytracker.colis_service.api.dto.CreateColisCommand;
import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import ma.emsi.deliverytracker.colis_service.domain.repository.ColisRepository;
import org.springframework.stereotype.Service;

@Service
public class ColisService {
    private final ColisRepository colisRepository;

    public ColisService(ColisRepository colisRepository) {
        this.colisRepository = colisRepository;
    }

    public Colis createColis(CreateColisCommand command){
        Colis colis = Colis.builder()
                .trackingNumber(command.trackingNumber())
                .senderName(command.senderName())
                .senderAddress(command.senderAddress())
                .senderEmail(command.senderEmail())
                .recipientName(command.recipientName())
                .recipientAddress(command.recipientAddress())
                .recipientEmail(command.recipientEmail())
                .weight(command.weight())
                .status(command.status())
                .build();
        return colisRepository.save(colis);
    }
}
