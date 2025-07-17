import React, { useState } from 'react';
import { 
  HomeIcon, 
  UserGroupIcon, 
  BeakerIcon, 
  ChartBarIcon, 
  BookOpenIcon,
  SparklesIcon,
  Bars3Icon,
  XMarkIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import Settings from './Settings';
import { useTranslation } from '../LanguageContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', name: t('dashboard'), icon: HomeIcon, color: 'from-blue-500 to-blue-600' },
    { id: 'farmers', name: t('farmerManagement'), icon: UserGroupIcon, color: 'from-green-500 to-green-600' },
    { id: 'crops', name: t('cropManagement'), icon: BeakerIcon, color: 'from-yellow-500 to-orange-600' },
    { id: 'analytics', name: t('analytics'), icon: ChartBarIcon, color: 'from-purple-500 to-pink-600' },
    { id: 'resources', name: t('resources'), icon: BookOpenIcon, color: 'from-indigo-500 to-purple-600' },
    { id: 'settings', name: t('settings'), icon: CogIcon, color: 'from-gray-500 to-gray-600' },
  ];

  const handleTabChange = (tabId) => {
    if (tabId === 'settings') {
      setIsSettingsOpen(true);
    } else {
      setActiveTab(tabId);
    }
    setIsMobileMenuOpen(false); // Close mobile menu when tab is selected
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-24 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-20 h-full w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 shadow-lg z-40 transform transition-all duration-300 ease-in-out
        lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 lg:p-6">
          <div className="flex items-center space-x-2 mb-6 lg:mb-8">
            <SparklesIcon className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600 dark:text-primary-400" />
            <span className="font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">Navigation</span>
          </div>
          
          <nav className="space-y-1 lg:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl font-medium transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg transform scale-105' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'}`} />
                  <span className="text-sm">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </nav>
          
          <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-700/50 transition-colors duration-300">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💡</span>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Pro Tip</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Use Analytics for insights into your farming data.
            </p>
          </div>
        </div>
      </aside>

      {/* Settings Modal */}
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default Sidebar;
