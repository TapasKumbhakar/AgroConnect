import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '../LanguageContext';

const Header = ({ user, onLogout }) => {
  const { t } = useTranslation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-green-100 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg lg:text-xl font-bold">🌾</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg lg:text-2xl font-bold gradient-text truncate">
                ARMS
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm hidden sm:block transition-colors duration-300">
                {t('agriculturalResourceManagement')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="hidden lg:flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-full transition-colors duration-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 dark:text-green-300 text-sm font-medium">{t('systemOnline')}</span>
            </div>
            
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-2 lg:px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 transition-colors duration-300"
                >
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs lg:text-sm font-semibold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <span className="hidden lg:block text-gray-700 dark:text-gray-200 font-medium">{user.name || 'User'}</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 transition-colors duration-300">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
                    >
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
