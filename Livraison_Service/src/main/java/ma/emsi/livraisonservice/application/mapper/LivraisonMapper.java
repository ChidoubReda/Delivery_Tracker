package ma.emsi.livraisonservice.application.mapper;

import ma.emsi.livraisonservice.api.dto.LivraisonRequest;
import ma.emsi.livraisonservice.api.dto.LivraisonResponse;
import ma.emsi.livraisonservice.domain.model.Livraison;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LivraisonMapper {
    @Mapping(target = "coordinates", source = "coordinates")
    LivraisonResponse toResponse(Livraison livraison);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dateCreation", ignore = true)
    @Mapping(target = "dateLivraisonEffective", ignore = true)
    @Mapping(target = "dateLivraisonPrevue", ignore = true) // Computed or set by logic?
    @Mapping(target = "etat", ignore = true)
    Livraison toEntity(LivraisonRequest request);
}
