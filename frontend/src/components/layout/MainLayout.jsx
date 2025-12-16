import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
    const location = useLocation();

    // Determine title based on path
    const getTitle = () => {
        switch (location.pathname) {
            case "/": return "Dashboard";
            case "/colis": return "Gestion des Colis";
            case "/livraisons": return "Suivi des Livraisons";
            case "/tracking": return "Carte & Tracking";
            case "/settings": return "Paramètres";
            default: return "Delivery Tracker";
        }
    };

    return (
        <div className="flex min-h-screen bg-background text-dark-900 font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                <Header title={getTitle()} />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
