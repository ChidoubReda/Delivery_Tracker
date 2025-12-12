package ma.emsi.deliverytracker.colis_service.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import ma.emsi.deliverytracker.colis_service.domain.model.Status;

// This DTO represents the input needed to create a Colis
@Getter
@Setter
@Builder
public class CreateColisCommand{
    private String trackingNumber;
    private String senderName;
    private String senderAddress;
    private String senderEmail;
    private String recipientName;
    private String recipientAddress;
    private String recipientEmail;
    private Double weight;
    private Status status;
}
