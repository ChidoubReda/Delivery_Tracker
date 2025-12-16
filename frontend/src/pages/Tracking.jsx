import { motion } from "framer-motion";
import { Navigation, MapPin, Locate } from "lucide-react";

export default function Tracking() {
    return (
        <div className="h-full flex flex-col gap-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="font-bold text-dark-900">Carte en Temps Réel</h2>
                        <p className="text-xs text-gray-500">Vue globale de la flotte</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-dark-900 text-white rounded-lg text-sm font-medium hover:bg-dark-800 transition-colors">
                    <Locate className="w-4 h-4" />
                    Centrer la carte
                </button>
            </div>

            <div className="flex-1 bg-slate-100 rounded-3xl border border-gray-200 relative overflow-hidden group">
                {/* Fake Map Grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                </div>

                {/* Roads (Fake) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 100 Q 400 300 800 100 T 1200 400" stroke="#94a3b8" strokeWidth="20" fill="none" />
                    <path d="M200 600 Q 500 400 800 600" stroke="#94a3b8" strokeWidth="20" fill="none" />
                </svg>

                {/* Markers */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1/4 left-1/4"
                >
                    <div className="relative">
                        <div className="w-4 h-4 bg-brand-600 rounded-full border-2 border-white shadow-lg z-10 relative"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-500 rounded-full opacity-30 animate-ping"></div>

                        {/* Tooltip */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-3 py-2 rounded-lg shadow-xl text-xs whitespace-nowrap z-20"
                        >
                            <p className="font-bold text-dark-900">Livreur #128</p>
                            <p className="text-gray-500">En route (45km/h)</p>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-1/3 right-1/3"
                >
                    <div className="relative">
                        <div className="w-4 h-4 bg-emerald-600 rounded-full border-2 border-white shadow-lg z-10 relative"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-500 rounded-full opacity-30 animate-pulse"></div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
