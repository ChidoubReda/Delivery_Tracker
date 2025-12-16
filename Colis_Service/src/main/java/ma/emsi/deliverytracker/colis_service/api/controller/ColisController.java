package ma.emsi.deliverytracker.colis_service.api.controller;

import ma.emsi.deliverytracker.colis_service.api.dto.ColisResponse;
import ma.emsi.deliverytracker.colis_service.api.dto.CreateColisCommand;
import ma.emsi.deliverytracker.colis_service.application.ColisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/colis") // API Gateway routes /colis-service/colis here if stripped, or we match gateway
public class ColisController {

    private final ColisService colisService;

    public ColisController(ColisService colisService) {
        this.colisService = colisService;
    }

    @PostMapping
    public ResponseEntity<ColisResponse> createColis(@RequestBody @Valid CreateColisCommand command) {
        return new ResponseEntity<>(colisService.createColis(command), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ColisResponse>> getAllColis() {
        return ResponseEntity.ok(colisService.getAllColis());
    }
}
