package ma.emsi.deliverytracker.colis_service.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Colis {
    // Identité du colis
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String trackingNumber;

    // Expediteur
    private String senderName;
    private String senderAddress;
    private String senderEmail;

    // Destinataire
    private String recipientName;
    private String recipientAddress;
    private String recipientEmail;

    // Détails du colis
    private Double weight;

    // Statut et suivi
    @Enumerated(EnumType.STRING)
    private Status status;

    // Champs supplémentaires
    private Date createdAt;
    private Date updatedAt;
    private LocalDate expectedDeliveryDate;

}
