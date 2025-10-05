import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import SalesPage from './pages/SalesPage';
import CatalogPage from './pages/CatalogPage';
import AIPage from './pages/AIPage';
import BookingPage from './pages/BookingPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        
        <div className="lg:pl-64">
          <Navbar 
            onToggleSidebar={toggleSidebar}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
          
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/ai" element={<AIPage />} />
              <Route path="/booking" element={<BookingPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
