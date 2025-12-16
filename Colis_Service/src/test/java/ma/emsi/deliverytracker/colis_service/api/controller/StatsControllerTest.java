package ma.emsi.deliverytracker.colis_service.api.controller;

import ma.emsi.deliverytracker.colis_service.domain.model.Status;
import ma.emsi.deliverytracker.colis_service.domain.repository.ColisRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class StatsControllerTest {

    @Mock
    private ColisRepository colisRepository;

    @InjectMocks
    private StatsController statsController;

    @Test
    public void testGetDashboardStats() {
        // Arrange
        when(colisRepository.count()).thenReturn(100L);
        when(colisRepository.countByStatus(Status.CREATED)).thenReturn(10L);
        when(colisRepository.countByStatus(Status.SHIPPED)).thenReturn(20L);
        when(colisRepository.countByStatus(Status.DELIVERED)).thenReturn(30L);
        when(colisRepository.countByStatus(Status.RETURNED)).thenReturn(40L);

        // Act
        Map<String, Object> stats = statsController.getDashboardStats();

        // Assert
        assertEquals(100L, stats.get("total"));
        assertEquals(10L, stats.get("created"));
        assertEquals(20L, stats.get("shipped"));
        assertEquals(30L, stats.get("delivered"));
        assertEquals(40L, stats.get("returned"));
    }
}
