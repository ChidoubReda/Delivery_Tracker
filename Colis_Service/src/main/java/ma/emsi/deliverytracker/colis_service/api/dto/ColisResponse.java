package ma.emsi.deliverytracker.colis_service.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import ma.emsi.deliverytracker.colis_service.domain.model.Status;

import java.util.Date;

// DTO de réponse exposé par l'API
@Getter
@Setter
@NoArgsConstructor
public class ColisResponse {

    private Long id;
    private String trackingNumber;

    private String senderName;
    private String senderAddress;
    private String senderEmail;

    private String recipientName;
    private String recipientAddress;
    private String recipientEmail;

    private Double weight;

    private Status status;

    private Date createdAt;
    private java.time.LocalDate expectedDeliveryDate;
}
