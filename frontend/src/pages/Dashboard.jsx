import { useState, useEffect } from "react";
import {
    Package,
    Truck,
    CheckCircle,
    AlertTriangle,
    TrendingUp,
    Clock
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { motion } from "framer-motion";
import { getDashboardStats } from "../api";

const data = [
    { name: 'Lun', colis: 40, livraisons: 24 },
    { name: 'Mar', colis: 30, livraisons: 13 },
    { name: 'Mer', colis: 20, livraisons: 98 },
    { name: 'Jeu', colis: 27, livraisons: 39 },
    { name: 'Ven', colis: 18, livraisons: 48 },
    { name: 'Sam', colis: 23, livraisons: 38 },
    { name: 'Dim', colis: 34, livraisons: 43 },
];

const initialStats = [
    { label: "Total Colis", value: "...", icon: Package, color: "text-blue-600", bg: "bg-blue-100", key: "total" },
    { label: "Livraisons en cours", value: "...", icon: Truck, color: "text-amber-600", bg: "bg-amber-100", key: "shipped" },
    { label: "Livrées Aujourd'hui", value: "...", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100", key: "delivered" },
    { label: "Retours", value: "...", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100", key: "returned" },
];

export default function Dashboard() {
    const [statsData, setStatsData] = useState(initialStats);

    useEffect(() => {
        const loadStats = async () => {
            const data = await getDashboardStats();
            if (data) {
                setStatsData(prev => prev.map(stat => ({
                    ...stat,
                    value: data[stat.key] !== undefined ? data[stat.key] : "0"
                })));
            }
        };
        loadStats();
    }, []);

    return (
        <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                <TrendingUp className="w-3 h-3" /> +12%
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-dark-900 mt-1">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-dark-900 mb-6">Activité de la semaine</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorColis" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorLiv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="colis" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorColis)" />
                                <Area type="monotone" dataKey="livraisons" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorLiv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Side Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="text-lg font-bold text-dark-900 mb-6">Répartition par Statut</h3>
                    <div className="h-64 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'En attente', value: 400 },
                                { name: 'En transit', value: 300 },
                                { name: 'Livré', value: 550 },
                                { name: 'Retour', value: 150 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" hide />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#94a3b8', '#3b82f6', '#22c55e', '#ef4444'][index % 4]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-gray-600"><div className="w-3 h-3 rounded-full bg-slate-400"></div>En attente</span>
                            <span className="font-bold">28%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-gray-600"><div className="w-3 h-3 rounded-full bg-blue-500"></div>En transit</span>
                            <span className="font-bold">21%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-gray-600"><div className="w-3 h-3 rounded-full bg-green-500"></div>Livré</span>
                            <span className="font-bold">39%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
