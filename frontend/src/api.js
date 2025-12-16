import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9999',
});

export const getColisList = async () => {
    try {
        const response = await api.get('/colis-service/colis');
        // Support both manual Controller (Array) and Spring Data REST (HAL)
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return response.data._embedded ? response.data._embedded.colises : [];
    } catch (error) {
        console.error("Error fetching colis:", error);
        return [];
    }
};

export const getLivraisonsList = async () => {
    try {
        const response = await api.get('/livraison-service/api/livraisons');
        return response.data;
    } catch (error) {
        console.error("Error fetching livraisons:", error);
        return [];
    }
};

export const getDashboardStats = async () => {
    try {
        const response = await api.get('/colis-service/api/stats');
        return response.data;
    } catch (error) {
        console.error("Error fetching stats:", error);
        return null;
    }
};

export default api;
