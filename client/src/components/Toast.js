import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
  };

  const colors = {
    success: 'from-green-500 to-green-600',
    error: 'from-red-500 to-red-600',
    warning: 'from-yellow-500 to-orange-600',
    info: 'from-blue-500 to-blue-600',
  };

  const Icon = icons[type] || icons.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-6 z-50 animate-slide-up">
      <div className={`bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-lg shadow-xl backdrop-blur-sm border border-white/20 max-w-sm`}>
        <div className="flex items-center space-x-3">
          <Icon className="w-6 h-6 flex-shrink-0" />
          <p className="text-sm font-medium">{message}</p>
          <button
            onClick={onClose}
            className="ml-auto text-white/80 hover:text-white transition-colors"
          >
            <span className="sr-only">Close</span>
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
