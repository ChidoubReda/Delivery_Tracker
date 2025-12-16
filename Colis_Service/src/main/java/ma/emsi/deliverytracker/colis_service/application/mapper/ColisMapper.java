package ma.emsi.deliverytracker.colis_service.application.mapper;

import ma.emsi.deliverytracker.colis_service.api.dto.ColisResponse;
import ma.emsi.deliverytracker.colis_service.api.dto.CreateColisCommand;
import ma.emsi.deliverytracker.colis_service.domain.model.Colis;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ColisMapper {
    ColisResponse toResponse(Colis colis);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Colis toEntity(CreateColisCommand command);
}
