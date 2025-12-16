package ma.emsi.livraisonservice.infrastructure.client.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ColisDTO {
    private Long id;
    private String trackingNumber;
    private String senderName;
    private String senderAddress;
    private String recipientName;
    private String recipientAddress;
    private Double weight;
    private String status;
}
