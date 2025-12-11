package ma.emsi.deliverytracker.colis_service.application;

import ma.emsi.deliverytracker.colis_service.api.dto.ColisResponse;
import ma.emsi.deliverytracker.colis_service.api.dto.CreateColisCommand;
import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import ma.emsi.deliverytracker.colis_service.domain.repository.ColisRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class ColisService {
    private final ColisRepository colisRepository;

    public ColisService(ColisRepository colisRepository) {
        this.colisRepository = colisRepository;
    }

    public ColisResponse createColis(CreateColisCommand commandDto){
        Colis colis = new Colis();
        ColisResponse colisResponse = new ColisResponse();
        BeanUtils.copyProperties(commandDto, colis);
        colisRepository.save(colis);
        BeanUtils.copyProperties(colis, colisResponse);
        return colisResponse;
    }
}
