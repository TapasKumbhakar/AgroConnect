import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FarmerManagement from './components/FarmerManagement';
import CropManagement from './components/CropManagement';
import Analytics from './components/Analytics';
import Resources from './components/Resources';
import Toast from './components/Toast';
import LandingPage from './components/LandingPage';
import LoginModal from './components/LoginModal';
import { LanguageProvider } from './LanguageContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Dark mode support
  useEffect(() => {
    const applyTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      const root = document.documentElement;
      
      if (savedTheme === 'dark') {
        root.classList.add('dark');
      } else if (savedTheme === 'light') {
        root.classList.remove('dark');
      } else if (savedTheme === 'system') {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    // Apply theme on initial load
    applyTheme();

    // Listen for localStorage changes (when Settings component updates theme)
    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        applyTheme();
      }
    };

    // Listen for system theme changes when 'system' is selected
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'system') {
        applyTheme();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    showToast('Logged out successfully', 'success');
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard showToast={showToast} />;
      case 'farmers':
        return <FarmerManagement showToast={showToast} />;
      case 'crops':
        return <CropManagement showToast={showToast} />;
      case 'analytics':
        return <Analytics showToast={showToast} />;
      case 'resources':
        return <Resources showToast={showToast} />;
      default:
        return <Dashboard showToast={showToast} />;
    }
  };

  // Show landing page if not logged in
  if (!isLoggedIn) {
    return (
      <Router future={{ v7_relativeSplatPath: true }}>
        <div className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
          <LandingPage
            onLogin={openLoginModal}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            user={user}
          />
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
            showToast={showToast}
          />
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </Router>
    );
  }

  return (
    <LanguageProvider>
      <Router future={{ v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
          <Header user={user} onLogout={handleLogout} />
          
          <div className="flex flex-col lg:flex-row">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className="flex-1 p-4 lg:p-6 lg:ml-64">
              <div className="max-w-7xl mx-auto">
                {renderActiveComponent()}
              </div>
            </main>
          </div>

          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
