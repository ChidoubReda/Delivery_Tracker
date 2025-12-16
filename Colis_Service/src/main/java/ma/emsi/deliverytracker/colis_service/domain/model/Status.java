package ma.emsi.deliverytracker.colis_service.domain.model;

public enum Status {
    CREATED,
    READY_FOR_PICKUP,
    IN_TRANSIT,
    SHIPPED,
    DELIVERED,
    RETURNED,
    CANCELED,
    LOST
}
