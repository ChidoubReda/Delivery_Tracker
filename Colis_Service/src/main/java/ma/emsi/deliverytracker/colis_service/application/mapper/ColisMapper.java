package ma.emsi.deliverytracker.colis_service.application.mapper;

import ma.emsi.deliverytracker.colis_service.api.dto.ColisResponse;
import ma.emsi.deliverytracker.colis_service.api.dto.CreateColisCommand;
import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ColisMapper {
    ColisResponse toResponse(Colis colis);

    Colis toEntity(CreateColisCommand command);
}
