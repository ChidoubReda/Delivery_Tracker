package ma.emsi.livraisonservice.api.controller;

import ma.emsi.livraisonservice.api.dto.LivraisonRequest;
import ma.emsi.livraisonservice.api.dto.LivraisonResponse;
import ma.emsi.livraisonservice.application.service.LivraisonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livraisons")
public class LivraisonController {

    private final LivraisonService livraisonService;

    public LivraisonController(LivraisonService livraisonService) {
        this.livraisonService = livraisonService;
    }

    @PostMapping
    public ResponseEntity<LivraisonResponse> createLivraison(@RequestBody LivraisonRequest request) {
        return new ResponseEntity<>(livraisonService.createLivraison(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LivraisonResponse>> getAllLivraisons() {
        return ResponseEntity.ok(livraisonService.getAllLivraisons());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivraisonResponse> getLivraisonById(@PathVariable Long id) {
        return ResponseEntity.ok(livraisonService.getLivraisonById(id));
    }
}
