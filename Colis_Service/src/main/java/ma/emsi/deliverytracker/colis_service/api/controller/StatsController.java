package ma.emsi.deliverytracker.colis_service.api.controller;

import ma.emsi.deliverytracker.colis_service.domain.repository.ColisRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final ColisRepository colisRepository;

    public StatsController(ColisRepository colisRepository) {
        this.colisRepository = colisRepository;
    }

    @GetMapping
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", colisRepository.count());
        // Simple counts for demonstration (real implementation would use JPQL group by)
        // Since we are using H2 and small data, fetching all and filtering in memory is
        // fine for a demo prototype
        // but for PROD we should add custom repository methods.

        // Let's stick to simple "total" for now and mock the breakdown in frontend or
        // add a custom query to repository.
        return stats;
    }
}
