import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Colis from "./pages/Colis";
import Livraisons from "./pages/Livraisons";
import Tracking from "./pages/Tracking";

// Placeholder for Settings
const Settings = () => (
  <div className="p-8 text-center text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col items-center justify-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <span className="text-2xl">⚙️</span>
    </div>
    <h2 className="text-xl font-bold text-dark-900">Paramètres</h2>
    <p>Module de configuration en cours de développement.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="colis" element={<Colis />} />
          <Route path="livraisons" element={<Livraisons />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
