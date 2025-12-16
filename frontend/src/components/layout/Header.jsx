import { Bell, Search } from "lucide-react";

export default function Header({ title }) {
    return (
        <header className="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
            <div>
                <h1 className="text-xl font-bold text-dark-900">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative w-64 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent focus:border-brand-200 focus:bg-white focus:ring-4 focus:ring-brand-50/50 rounded-full text-sm outline-none transition-all"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>
    );
}
