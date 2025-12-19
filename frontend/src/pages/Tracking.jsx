import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getLivraisonsList } from "../api";
import { MapPin, Locate, Loader } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Leaflet + React
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default function Tracking() {
    const [livraisons, setLivraisons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getLivraisonsList();
                setLivraisons(data);
            } catch (e) {
                console.error("Error loading map data:", e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const center = [33.5731, -7.5898]; // Casablanca Default

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="font-bold text-dark-900">Carte en Temps Réel</h2>
                        <p className="text-xs text-gray-500">
                            {loading ? "Chargement..." : `${livraisons.length} livraisons actives`}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-slate-100 rounded-3xl border border-gray-200 relative overflow-hidden shadow-inner isolate z-0">
                <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%", zIndex: 0 }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {livraisons.map((l) => {
                        if (!l.coordinates) return null;

                        // Robust parsing for "33,5527, -7,6002" or "33.5527, -7.6002"
                        let lat, lng;
                        // Replace comma decimals with dots first if they look like "33,55"
                        // But wait, "33,55, -7,60" is ambiguous.
                        // Strategy: Normalize separators. 

                        // If formatted as "33,1234, -7,1234" (4 parts), it's likely comma-separated decimals
                        const parts = l.coordinates.split(",").map(s => s.trim());

                        if (parts.length === 2) {
                            // "33.123, -7.123" OR "33,123" (invalid lon)
                            [lat, lng] = parts.map(Number);
                        } else if (parts.length >= 4) {
                            // "33, 1234, -7, 1234" -> 33.1234, -7.1234
                            lat = parseFloat(parts[0] + "." + parts[1]);
                            lng = parseFloat(parts[2] + "." + parts[3]);
                        } else {
                            return null;
                        }

                        if (isNaN(lat) || isNaN(lng)) return null;

                        return (
                            <Marker key={l.id} position={[lat, lng]}>
                                <Popup>
                                    <div className="p-1">
                                        <h3 className="font-bold">Livraison #{l.id}</h3>
                                        <p className="text-sm">{l.adresseDestination}</p>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mt-1 inline-block">
                                            {l.etat}
                                        </span>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>

                {loading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-[1000]">
                        <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
                    </div>
                )}
            </div>
        </div>
    );
}
