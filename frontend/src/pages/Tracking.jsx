import { useEffect, useState } from "react";
import { Navigation, MapPin, Locate } from "lucide-react";
import MapComponent from "../components/MapComponent";
import { getLivraisonsList } from "../api";

export default function Tracking() {
    const [livraisons, setLivraisons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLivraisons = async () => {
            try {
                const data = await getLivraisonsList();
                console.log("DEBUG Tracking Data:", data); // Debug log
                setLivraisons(data);
            } catch (err) {
                console.error("Failed to fetch livraisons", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLivraisons();
        // Poll every 30 seconds for updates
        const interval = setInterval(fetchLivraisons, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="font-bold text-dark-900">Carte en Temps Réel</h2>
                        <p className="text-xs text-gray-500">
                            {loading ? "Chargement..." : `${livraisons.length} livraisons actives`}
                        </p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-dark-900 text-white rounded-lg text-sm font-medium hover:bg-dark-800 transition-colors">
                    <Locate className="w-4 h-4" />
                    Centrer la carte
                </button>
            </div>

            <div className="flex-1 bg-slate-100 rounded-3xl border border-gray-200 relative overflow-hidden group z-0">
                {/* Map Component */}
                <MapComponent deliveries={livraisons} />
            </div>
        </div>
    );
}
