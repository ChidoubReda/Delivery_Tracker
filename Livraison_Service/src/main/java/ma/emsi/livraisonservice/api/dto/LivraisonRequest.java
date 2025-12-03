package ma.emsi.livraisonservice.api.dto;

import lombok.Data;

@Data
public class LivraisonRequest {
    private Long colisId;
    private String adresseDestination;
    private String livreurId;
}
