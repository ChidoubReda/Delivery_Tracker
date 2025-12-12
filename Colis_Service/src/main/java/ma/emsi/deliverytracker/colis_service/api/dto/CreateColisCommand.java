package ma.emsi.deliverytracker.colis_service.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import ma.emsi.deliverytracker.colis_service.domain.model.Status;
import jakarta.validation.constraints.*;

// This DTO represents the input needed to create a Colis
@Getter
@Setter
@Builder
public class CreateColisCommand {
    @NotBlank(message = "Tracking number is required")
    private String trackingNumber;

    @NotBlank(message = "Sender name is required")
    private String senderName;

    @NotBlank(message = "Sender address is required")
    private String senderAddress;

    @Email(message = "Invalid sender email")
    @NotBlank(message = "Sender email is required")
    private String senderEmail;

    @NotBlank(message = "Recipient name is required")
    private String recipientName;

    @NotBlank(message = "Recipient address is required")
    private String recipientAddress;

    @Email(message = "Invalid recipient email")
    @NotBlank(message = "Recipient email is required")
    private String recipientEmail;

    @NotNull(message = "Weight is required")
    @Positive(message = "Weight must be positive")
    private Double weight;

    private Status status;
}
