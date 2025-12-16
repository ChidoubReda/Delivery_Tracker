import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api";

export default function CreateColisModal({ isOpen, onClose, onCreated }) {
    const [formData, setFormData] = useState({
        senderName: "",
        senderEmail: "",
        senderAddress: "",
        recipientName: "",
        recipientEmail: "",
        recipientAddress: "",
        weight: "",
        expectedDeliveryDate: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                weight: parseFloat(formData.weight.replace(',', '.')),
                status: "CREATED",
                trackingNumber: "TRK-" + Math.floor(Math.random() * 100000)
            };
            // Remove createdAt (handled by backend or not needed)
            // Ensure expectedDeliveryDate is just the date string or handled correctly
            await api.post("/colis-service/colis", payload);
            onCreated();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to create colis");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-dark-900">Nouveau Colis</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Expéditeur</label>
                                    <input required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                                        value={formData.senderName} onChange={e => setFormData({ ...formData, senderName: e.target.value })} placeholder="Nom complet" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email Exp.</label>
                                    <input type="email" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                                        value={formData.senderEmail} onChange={e => setFormData({ ...formData, senderEmail: e.target.value })} placeholder="email@expediteur.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Destinataire</label>
                                    <input required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                                        value={formData.recipientName} onChange={e => setFormData({ ...formData, recipientName: e.target.value })} placeholder="Nom complet" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email Dest.</label>
                                    <input type="email" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                                        value={formData.recipientEmail} onChange={e => setFormData({ ...formData, recipientEmail: e.target.value })} placeholder="email@destinataire.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Adresse Expéditeur</label>
                                <input required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                                    value={formData.senderAddress} onChange={e => setFormData({ ...formData, senderAddress: e.target.value })} placeholder="Adresse complète" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Adresse Destinataire</label>
                                <input required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                                    value={formData.recipientAddress} onChange={e => setFormData({ ...formData, recipientAddress: e.target.value })} placeholder="Adresse complète" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Poids (kg)</label>
                                    <input type="number" step="0.1" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                                        value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} placeholder="0.0" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Date Prévue</label>
                                    <input type="date" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                                        value={formData.expectedDeliveryDate} onChange={e => setFormData({ ...formData, expectedDeliveryDate: e.target.value })} />
                                </div>
                            </div>

                            <button disabled={loading} type="submit" className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-200 mt-4 disabled:opacity-50">
                                {loading ? "Création..." : "Créer le Colis"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
