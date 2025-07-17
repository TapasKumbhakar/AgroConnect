import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon, 
  SunIcon, 
  MoonIcon,
  LanguageIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from '../LanguageContext';

const Settings = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState('light');
  const { language, t, changeLanguage } = useTranslation();

  // Indian native languages
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' }
  ];

  const themeOptions = [
    { value: 'light', label: t('light'), icon: SunIcon },
    { value: 'dark', label: t('dark'), icon: MoonIcon },
    { value: 'system', label: t('system'), icon: ComputerDesktopIcon }
  ];

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    // Language is now managed by LanguageContext, no need to set it here
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Trigger a storage event for other components (like App.js) to listen
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'theme',
      newValue: newTheme,
      storageArea: localStorage
    }));
  };

  const handleLanguageChange = (newLanguage) => {
    // Use the changeLanguage function from LanguageContext
    changeLanguage(newLanguage);
    
    // Don't reload the page - let React Context handle the language change
    // window.location.reload(); // REMOVED
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('settings')}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Theme Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <SunIcon className="w-5 h-5 mr-2 text-yellow-500" />
              {t('themeSettings')}
            </h3>
            <div className="space-y-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl border-2 transition-all duration-200 ${
                      theme === option.value
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      theme === option.value ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                    }`} />
                    <span className="font-medium">{option.label}</span>
                    {theme === option.value && (
                      <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <LanguageIcon className="w-5 h-5 mr-2 text-blue-500" />
              {t('languageSettings')}
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 ${
                    language === lang.code
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{lang.name}</span>
                    <span className={`text-sm ${
                      language === lang.code ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {lang.nativeName}
                    </span>
                  </div>
                  {language === lang.code && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">ℹ️</span>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{t('information')}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('settingsAutoSaved')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
