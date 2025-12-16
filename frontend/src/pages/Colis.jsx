import { useState, useEffect } from "react";
import { getColisList } from "../api";
import { Package, Search, Filter, Plus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CreateColisModal from "../components/dashboard/CreateColisModal";

const STATUS_COLORS = {
    CREATED: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-amber-100 text-amber-700",
    DELIVERED: "bg-emerald-100 text-emerald-700",
    RETURNED: "bg-red-100 text-red-700",
};

export default function Colis() {
    const [colis, setColis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getColisList();
            setColis(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredColis = colis.filter(c =>
        c.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.recipientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <CreateColisModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreated={loadData}
            />
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Rechercher un colis..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-50/50 rounded-xl text-sm outline-none transition-all shadow-sm"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors shadow-sm">
                        <Filter className="w-4 h-4" />
                        <span>Filtres</span>
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 font-medium transition-colors shadow-sm shadow-brand-200"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Nouveau Colis</span>
                    </button>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredColis.map((c, i) => (
                        <motion.div
                            key={c.id || i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-brand-100 transition-all group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2.5 bg-brand-50 rounded-xl group-hover:bg-brand-100 transition-colors">
                                    <Package className="w-6 h-6 text-brand-600" />
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[c.status] || 'bg-gray-100'}`}>
                                    {c.status}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-dark-900 mb-1">{c.trackingNumber}</h3>

                            <div className="space-y-3 mt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Expéditeur</span>
                                    <span className="font-medium text-dark-900">{c.senderName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Destinataire</span>
                                    <span className="font-medium text-dark-900">{c.recipientName}</span>
                                </div>
                                <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
                                    <p className="text-xs text-gray-400">Poids: {c.weight}kg</p>
                                    <button className="p-1.5 rounded-full hover:bg-gray-100 text-brand-600 opacity-0 group-hover:opacity-100 transition-all">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
