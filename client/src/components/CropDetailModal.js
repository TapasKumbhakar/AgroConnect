import React from 'react';
import { 
  XMarkIcon, 
  CalendarIcon, 
  BeakerIcon, 
  ClockIcon,
  CloudIcon,
  SunIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { getCropCategory } from '../utils/cropUtils';

const CropDetailModal = ({ crop, isOpen, onClose }) => {
  if (!isOpen || !crop) return null;

  const getCropImage = (cropName) => {
    // For now, using placeholder images. In a real app, you'd have actual crop images
    const imageMap = {
      'Rice': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
      'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      'Maize (Corn)': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop',
      'Tomato': 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
      'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
      'Onion': 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=300&fit=crop',
      'Cotton': 'https://images.unsplash.com/photo-1583306018533-dfe8d4928e5e?w=400&h=300&fit=crop',
      'Sugarcane': 'https://images.unsplash.com/photo-1574114198950-bcb9ce5c6ba6?w=400&h=300&fit=crop',
      'Soybeans': 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop',
      'Chickpea': 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400&h=300&fit=crop',
      'Sunflower': 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=400&h=300&fit=crop',
      'Mustard': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'default': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'
    };
    return imageMap[cropName] || imageMap['default'];
  };

  const getSeasonColor = (season) => {
    const colors = {
      Kharif: 'from-green-400 to-green-600',
      Rabi: 'from-yellow-400 to-orange-500',
      Zaid: 'from-blue-400 to-blue-600',
      'Year Round': 'from-purple-400 to-purple-600'
    };
    return colors[season] || 'from-gray-400 to-gray-500';
  };

  const getWaterColor = (requirement) => {
    const colors = {
      Low: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      Medium: 'bg-blue-100 text-blue-800 border-blue-300',
      High: 'bg-indigo-100 text-indigo-800 border-indigo-300'
    };
    return colors[requirement] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getPlantingTips = (cropName) => {
    const tips = {
      'Rice': [
        'Prepare flooded fields before transplanting',
        'Maintain water level of 2-5 cm during growing season',
        'Use certified seeds for better yield',
        'Apply organic manure before planting'
      ],
      'Wheat': [
        'Sow seeds in well-prepared seedbed',
        'Ensure proper spacing between rows (18-23 cm)',
        'Apply balanced fertilizers at planting',
        'Monitor for rust and other diseases'
      ],
      'Tomato': [
        'Start with healthy seedlings',
        'Provide support stakes for plant growth',
        'Maintain consistent watering schedule',
        'Prune suckers for better fruit development'
      ],
      'default': [
        'Prepare soil with proper drainage',
        'Use quality seeds from reliable sources',
        'Follow recommended planting dates',
        'Monitor for pests and diseases regularly'
      ]
    };
    return tips[cropName] || tips['default'];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 lg:p-4">
      <div className="bg-white rounded-xl lg:rounded-2xl max-w-4xl w-full max-h-[95vh] lg:max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative">
          <img 
            src={getCropImage(crop.name)} 
            alt={crop.name}
            className="w-full h-48 lg:h-64 object-cover rounded-t-xl lg:rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl lg:rounded-t-2xl"></div>
          <button
            onClick={onClose}
            className="absolute top-2 lg:top-4 right-2 lg:right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </button>
          <div className="absolute bottom-2 lg:bottom-4 left-2 lg:left-4 text-white">
            <h2 className="text-xl lg:text-3xl font-bold">{crop.name}</h2>
            <span className={`inline-block px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-gradient-to-r ${getSeasonColor(crop.season)} mt-1 lg:mt-2`}>
              {getCropCategory(crop.name)} • {crop.season}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 lg:p-4 rounded-xl border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <BeakerIcon className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                <span className="text-xs lg:text-sm font-medium text-green-800">pH Range</span>
              </div>
              <p className="text-sm lg:text-lg font-bold text-green-900">
                {crop.soilPhRange ? `${crop.soilPhRange.min} - ${crop.soilPhRange.max}` : 'N/A'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 lg:p-4 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <CloudIcon className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                <span className="text-xs lg:text-sm font-medium text-blue-800">Water Need</span>
              </div>
              <span className={`inline-block px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-bold border ${getWaterColor(crop.waterRequirement)}`}>
                {crop.waterRequirement}
              </span>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 lg:p-4 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <ClockIcon className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
                <span className="text-xs lg:text-sm font-medium text-purple-800">Duration</span>
              </div>
              <p className="text-sm lg:text-lg font-bold text-purple-900">{crop.growthDuration} days</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 lg:p-4 rounded-xl border border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <CalendarIcon className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
                <span className="text-xs lg:text-sm font-medium text-orange-800">Season</span>
              </div>
              <p className="text-sm lg:text-lg font-bold text-orange-900">{crop.season}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center space-x-2 mb-3 lg:mb-4">
              <InformationCircleIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900">About This Crop</h3>
            </div>
            <p className="text-sm lg:text-base text-gray-700 leading-relaxed bg-gray-50 p-3 lg:p-4 rounded-xl border">
              {crop.description || `${crop.name} is an important agricultural crop with specific growing requirements and benefits.`}
            </p>
          </div>

          {/* Planting Tips */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center space-x-2 mb-3 lg:mb-4">
              <SunIcon className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Planting Tips</h3>
            </div>
            <div className="bg-yellow-50 p-3 lg:p-4 rounded-xl border border-yellow-200">
              <ul className="space-y-2">
                {getPlantingTips(crop.name).map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm lg:text-base text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <MapPinIcon className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 mr-2" />
                Growing Conditions
              </h4>
              <ul className="space-y-2 text-xs lg:text-sm text-gray-600">
                <li>• <strong>Season:</strong> {crop.season}</li>
                <li>• <strong>Water Requirement:</strong> {crop.waterRequirement}</li>
                <li>• <strong>Growth Duration:</strong> {crop.growthDuration} days</li>
                <li>• <strong>Soil pH:</strong> {crop.soilPhRange ? `${crop.soilPhRange.min} - ${crop.soilPhRange.max}` : 'N/A'}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <CurrencyDollarIcon className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 mr-2" />
                Economic Benefits
              </h4>
              <ul className="space-y-2 text-xs lg:text-sm text-gray-600">
                <li>• Suitable for {crop.season} season cultivation</li>
                <li>• {crop.waterRequirement.toLowerCase()} water requirement reduces costs</li>
                <li>• {crop.growthDuration < 90 ? 'Quick' : crop.growthDuration < 150 ? 'Medium' : 'Long'} growing cycle</li>
                <li>• High demand in local and export markets</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
            >
              Close
            </button>
            <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200">
              Add to My Crops
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetailModal;
