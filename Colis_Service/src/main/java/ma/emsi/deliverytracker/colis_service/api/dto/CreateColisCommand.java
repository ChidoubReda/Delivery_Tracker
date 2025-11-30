package ma.emsi.deliverytracker.colis_service.api.dto;

import ma.emsi.deliverytracker.colis_service.domain.model.Status;

// This DTO represents the input needed to create a Colis
public record CreateColisCommand(
        String trackingNumber,
        String senderName,
        String senderAddress,
        String senderEmail,
        String recipientName,
        String recipientAddress,
        String recipientEmail,
        Double weight,
        Status status
) {}
