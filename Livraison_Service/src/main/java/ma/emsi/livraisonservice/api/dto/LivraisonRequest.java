package ma.emsi.livraisonservice.api.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public record LivraisonRequest {
    @NotNull(message = "Colis ID is required")
    private Long colisId;

    @NotBlank(message = "Destination address is required")
    private String adresseDestination;

    @NotBlank(message = "Livreur ID is required")
    private String livreurId;

    private String coordinates;
}
