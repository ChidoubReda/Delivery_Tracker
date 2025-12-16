package ma.emsi.deliverytracker.colis_service.application;

import ma.emsi.deliverytracker.colis_service.api.dto.ColisResponse;
import ma.emsi.deliverytracker.colis_service.api.dto.CreateColisCommand;
import ma.emsi.deliverytracker.colis_service.application.mapper.ColisMapper;
import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import ma.emsi.deliverytracker.colis_service.domain.repository.ColisRepository;
import org.springframework.stereotype.Service;

@Service
public class ColisService {

    private final ColisRepository colisRepository;
    private final ColisMapper colisMapper;

    public ColisService(ColisRepository colisRepository, ColisMapper colisMapper) {
        this.colisRepository = colisRepository;
        this.colisMapper = colisMapper;
    }

    public ColisResponse createColis(CreateColisCommand commandDto) {
        Colis colis = colisMapper.toEntity(commandDto);
        colis = colisRepository.save(colis);
        return colisMapper.toResponse(colis);
    }

    public java.util.List<ColisResponse> getAllColis() {
        return colisRepository.findAll().stream()
                .map(colisMapper::toResponse)
                .collect(java.util.stream.Collectors.toList());
    }
}
