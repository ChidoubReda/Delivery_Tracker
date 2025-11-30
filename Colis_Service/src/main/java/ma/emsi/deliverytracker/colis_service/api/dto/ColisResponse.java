package ma.emsi.deliverytracker.colis_service.api.dto;

import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import ma.emsi.deliverytracker.colis_service.domain.model.Status;

import java.util.Date;

// DTO de réponse exposé par l'API
public record ColisResponse(
        Long id,
        String trackingNumber,
        String senderName,
        String senderAddress,
        String senderEmail,
        String recipientName,
        String recipientAddress,
        String recipientEmail,
        Double weight,
        Status status,
        Date createdAt,
        Date expectedDeliveryDate
) {
    // Méthode utilitaire pour mapper un Colis domaine → DTO
    public static ColisResponse from(Colis colis) {
        return new ColisResponse(
                colis.getId(),
                colis.getTrackingNumber(),
                colis.getSenderName(),
                colis.getSenderAddress(),
                colis.getSenderEmail(),
                colis.getRecipientName(),
                colis.getRecipientAddress(),
                colis.getRecipientEmail(),
                colis.getWeight(),
                colis.getStatus(),
                colis.getCreatedAt(),
                colis.getExpectedDeliveryDate()
        );
    }
}
