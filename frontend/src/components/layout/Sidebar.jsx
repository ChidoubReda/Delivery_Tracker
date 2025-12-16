import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Truck,
    Map,
    Settings,
    Menu,
    X,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { label: "Colis", icon: Package, path: "/colis" },
    { label: "Livraisons", icon: Truck, path: "/livraisons" },
    { label: "Carte & Tracking", icon: Map, path: "/tracking" },
    { label: "Paramètres", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <motion.aside
            initial={{ width: 256 }}
            animate={{ width: collapsed ? 80 : 256 }}
            className="h-screen sticky top-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-50 shadow-sm"
        >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-brand-600 rounded-lg shrink-0">
                        <Package className="w-5 h-5 text-white" />
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="font-bold text-lg text-dark-900 whitespace-nowrap"
                            >
                                Tracker
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative overflow-hidden",
                                active
                                    ? "bg-brand-50 text-brand-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-dark-900"
                            )}
                        >
                            <item.icon className={cn("shrink-0 w-5 h-5", active ? "text-brand-600" : "text-gray-400 group-hover:text-dark-900")} />

                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="truncate"
                                >
                                    {item.label}
                                </motion.span>
                            )}

                            {/* Tooltip for collapsed mode */}
                            {collapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-dark-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100">
                <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        A
                    </div>
                    {!collapsed && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-dark-900 truncate">Admin User</p>
                            <p className="text-xs text-gray-500 truncate">admin@tracker.com</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.aside>
    );
}
