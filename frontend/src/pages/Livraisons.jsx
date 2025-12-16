import { useState, useEffect } from "react";
import { getLivraisonsList } from "../api";
import { Truck, MapPin, Calendar, Clock, CheckCircle, Navigation, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Livraisons() {
    const [livraisons, setLivraisons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getLivraisonsList();
                setLivraisons(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-dark-900">Suivi des Livraisons</h2>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> En direct
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {loading ? (
                    <div className="text-gray-400">Chargement des livraisons...</div>
                ) : livraisons.length === 0 ? (
                    <div className="text-gray-400">Aucune livraison en cours.</div>
                ) : (
                    livraisons.map((l, i) => (
                        <motion.div
                            key={l.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                        <Truck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-dark-900">Livraison #{l.id}</h3>
                                        <p className="text-sm text-gray-500">Colis ID: {l.colisId}</p>
                                    </div>
                                </div>
                                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                                    {l.etat}
                                </span>
                            </div>

                            {/* Timeline (Simulation) */}
                            <div className="relative pl-4 border-l-2 border-indigo-100 space-y-6">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm" />
                                    <div className="flex justify-between">
                                        <p className="text-sm font-medium text-dark-900">Commande prise en charge</p>
                                        <span className="text-xs text-gray-400">09:00</span>
                                    </div>
                                    <p className="text-xs text-gray-500">La commande a quitté l'entrepôt.</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm animate-pulse" />
                                    <div className="flex justify-between">
                                        <p className="text-sm font-medium text-dark-900">En cours d'acheminement</p>
                                        <span className="text-xs text-green-600 font-bold">Maintenant</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Destination: {l.adresseDestination}</p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Navigation className="w-4 h-4" />
                                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">{l.coordinates || "GPS en attente"}</span>
                                </div>
                                <button className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                                    <PlayCircle className="w-4 h-4" />
                                    Suivre sur la carte
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
