package ma.emsi.deliverytracker.colis_service.api.controller;

import ma.emsi.deliverytracker.colis_service.api.dto.CreateColisCommand;
import ma.emsi.deliverytracker.colis_service.api.dto.ColisResponse;
import ma.emsi.deliverytracker.colis_service.application.ColisService;
import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// API REST pour gérer les colis
@RestController
@RequestMapping("/api/colis")
public class ColisController {

    private final ColisService colisService;

    public ColisController(ColisService colisService) {
        this.colisService = colisService;
    }

    @PostMapping
    public ResponseEntity<ColisResponse> createColis(@RequestBody CreateColisCommand command) {
        Colis colis = colisService.createColis(command);
        ColisResponse response = ColisResponse.from(colis);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
