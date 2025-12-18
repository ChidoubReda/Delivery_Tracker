import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = ({ deliveries = [] }) => {
    // Default center (Casablanca, Morocco example, or average of points)
    const defaultCenter = [33.5731, -7.5898];

    return (
        <MapContainer
            center={defaultCenter}
            zoom={12}
            style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {deliveries.map((delivery) => {
                if (!delivery.coordinates) return null;
                const [lat, lng] = delivery.coordinates.split(',').map(Number);
                if (isNaN(lat) || isNaN(lng)) return null;

                return (
                    <Marker key={delivery.id} position={[lat, lng]}>
                        <Popup>
                            <div className="text-sm">
                                <strong className="block text-dark-900 mb-1">Livraison #{delivery.id}</strong>
                                <span className="text-gray-500">{delivery.etat}</span>
                                <br />
                                <span className="text-xs text-gray-400">{delivery.adresseDestination}</span>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default MapComponent;
