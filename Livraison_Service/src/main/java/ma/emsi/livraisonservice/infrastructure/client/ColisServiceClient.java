package ma.emsi.livraisonservice.infrastructure.client;

import ma.emsi.livraisonservice.infrastructure.client.dto.ColisDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "colis-service", url = "${colis-service.url:http://localhost:8081}")
public interface ColisServiceClient {

    @GetMapping("/api/colis/{id}")
    ColisDTO getColisById(@PathVariable("id") Long id);
}
