package ma.emsi.deliverytracker.colis_service.domain.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LivraisonEvent {
    private Long livraisonId;
    private String status;
}
