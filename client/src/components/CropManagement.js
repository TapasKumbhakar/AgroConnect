import React, { useState, useEffect, useCallback } from 'react';
import { 
  PlusIcon, 
  BeakerIcon, 
  MagnifyingGlassIcon,
  XMarkIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from '../LanguageContext';
import CropDetailModal from './CropDetailModal';
import { cropCategories, getCropCategory, getCategoryColor, groupCropsByCategory } from '../utils/cropUtils';

const CropManagement = ({ showToast }) => {
  const { t } = useTranslation();
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('');
  const [waterFilter, setWaterFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    season: '',
    soilPhMin: '',
    soilPhMax: '',
    waterRequirement: '',
    growthDuration: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCrops = useCallback(async () => {
    try {
      const response = await fetch('/api/crops');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched crops:', data); // Debug log
        setCrops(data);
        setFilteredCrops(data);
      } else {
        console.error('Failed to fetch crops:', response.status);
        showToast('Failed to load crops', 'error');
      }
    } catch (error) {
      console.error('Error fetching crops:', error);
      showToast('Failed to load crops', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Filter crops based on search and filters
  useEffect(() => {
    console.log('Filtering crops, total crops:', crops.length); // Debug log
    let filtered = crops;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(crop =>
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Season filter
    if (seasonFilter) {
      filtered = filtered.filter(crop => crop.season === seasonFilter);
    }

    // Water requirement filter
    if (waterFilter) {
      filtered = filtered.filter(crop => crop.waterRequirement === waterFilter);
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter(crop => getCropCategory(crop.name) === categoryFilter);
    }

    console.log('Filtered crops:', filtered.length); // Debug log
    setFilteredCrops(filtered);
  }, [crops, searchQuery, seasonFilter, waterFilter, categoryFilter]);

  // Seed crops database
  const seedCropsDatabase = async () => {
    try {
      setLoading(true);
      console.log('Seeding crops database...'); // Debug log
      const response = await fetch('/api/crops/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Seed result:', result); // Debug log
        showToast(`${result.message}`, 'success');
        fetchCrops();
      } else {
        console.error('Failed to seed crops:', response.status);
        showToast('Failed to seed crops database', 'error');
      }
    } catch (error) {
      console.error('Error seeding crops:', error);
      showToast('Error seeding crops database', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('CropManagement component mounted, fetching crops...'); // Debug log
    fetchCrops();
  }, [fetchCrops]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData); // Debug log
    
    // Validation
    if (!formData.name || !formData.season || !formData.soilPhMin || !formData.soilPhMax || 
        !formData.waterRequirement || !formData.growthDuration) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true); // Show loading state

    const cropData = {
      ...formData,
      soilPhRange: {
        min: parseFloat(formData.soilPhMin),
        max: parseFloat(formData.soilPhMax)
      },
      growthDuration: parseInt(formData.growthDuration)
    };
    delete cropData.soilPhMin;
    delete cropData.soilPhMax;

    console.log('Sending crop data:', cropData); // Debug log

    try {
      const response = await fetch('/api/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cropData)
      });

      console.log('Response status:', response.status); // Debug log

      if (response.ok) {
        const result = await response.json();
        console.log('Crop added successfully:', result); // Debug log
        showToast('Crop added successfully!');
        resetForm();
        fetchCrops();
      } else {
        const error = await response.json();
        console.error('Error adding crop:', error); // Debug log
        showToast(error.error || 'Failed to add crop', 'error');
      }
    } catch (error) {
      console.error('Network error:', error); // Debug log
      showToast('Network error occurred', 'error');
    } finally {
      setIsSubmitting(false); // Hide loading state
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      season: '',
      soilPhMin: '',
      soilPhMax: '',
      waterRequirement: '',
      growthDuration: '',
      description: ''
    });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedCrop(null);
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
      Low: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300',
      Medium: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300',
      High: 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border-indigo-300'
    };
    return colors[requirement] || 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300';
  };

  if (loading) {
    return (
      <div className="animate-fade-in flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">Crop Database</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base transition-colors duration-300">Manage crop information and growing conditions</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Crop</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="card p-4 lg:p-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder={t('searchCrops')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-2">
            <select
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent flex-1 sm:flex-none transition-colors duration-300"
            >
              <option value="">{t('allSeasons')}</option>
              <option value="Kharif">{t('kharif')}</option>
              <option value="Rabi">{t('rabi')}</option>
              <option value="Zaid">{t('zaid')}</option>
              <option value="Year Round">{t('yearRound')}</option>
            </select>

            <select
              value={waterFilter}
              onChange={(e) => setWaterFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent flex-1 sm:flex-none transition-colors duration-300"
            >
              <option value="">{t('waterNeeds')}</option>
              <option value="Low">{t('low')}</option>
              <option value="Medium">{t('medium')}</option>
              <option value="High">{t('high')}</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent flex-1 sm:flex-none transition-colors duration-300"
            >
              <option value="">{t('allCategories')}</option>
              {Object.keys(cropCategories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={seedCropsDatabase}
                disabled={loading}
                className="px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 flex-1 sm:flex-none justify-center"
              >
                <BeakerIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{t('seedDB')}</span>
              </button>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSeasonFilter('');
                  setWaterFilter('');
                  setCategoryFilter('');
                }}
                className="px-3 lg:px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center"
              >
                <XMarkIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{t('clear')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">{t('addNewCrop')}</h2>
            <button
              onClick={resetForm}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">{t('cropName')} *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Season *</label>
              <select
                name="season"
                value={formData.season}
                onChange={handleInputChange}
                className="select-field"
                required
              >
                <option value="">Select season</option>
                <option value="Kharif">Kharif (Monsoon Season)</option>
                <option value="Rabi">Rabi (Winter Season)</option>
                <option value="Zaid">Zaid (Summer Season)</option>
                <option value="Year Round">Year Round</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Soil pH *</label>
              <input
                type="number"
                name="soilPhMin"
                value={formData.soilPhMin}
                onChange={handleInputChange}
                step="0.1"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Soil pH *</label>
              <input
                type="number"
                name="soilPhMax"
                value={formData.soilPhMax}
                onChange={handleInputChange}
                step="0.1"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Water Requirement *</label>
              <select
                name="waterRequirement"
                value={formData.waterRequirement}
                onChange={handleInputChange}
                className="select-field"
                required
              >
                <option value="">Select requirement</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Growth Duration (days) *</label>
              <input
                type="number"
                name="growthDuration"
                value={formData.growthDuration}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Brief description of the crop"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Crop...' : 'Add Crop'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="ml-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Crops by Categories */}
      {filteredCrops.length === 0 ? (
        <div className="text-center py-12">
          <BeakerIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {crops.length === 0 ? 'No crops in database yet.' : 'No crops match your search criteria.'}
          </p>
          {crops.length === 0 && (
            <button
              onClick={seedCropsDatabase}
              disabled={loading}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Seed Database with Sample Crops
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupCropsByCategory(filteredCrops)).map(([category, categorycrops]) => (
            <div key={category} className="space-y-4">
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${getCategoryColor(category)} p-4 rounded-xl shadow-lg`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl lg:text-2xl font-bold text-white">
                    {category}
                  </h2>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                    {categorycrops.length} crops
                  </span>
                </div>
              </div>

              {/* Category Crops Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {categorycrops.map((crop) => (
                  <div 
                    key={crop._id} 
                    className="relative bg-white rounded-2xl crop-card-shadow hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:scale-[1.02] hover:-translate-y-1 border border-gray-100 hover:border-green-300 overflow-hidden card-glow"
                    onClick={() => handleCropClick(crop)}
                  >
                    {/* Gradient Background Overlay */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryColor(category)}`}></div>
                    
                    {/* Card Content */}
                    <div className="p-6 relative">
                      {/* Header Section */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-14 h-14 bg-gradient-to-br ${getCategoryColor(category)} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <BeakerIcon className="w-7 h-7 text-white drop-shadow-sm" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-200 leading-tight">{crop.name}</h3>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getSeasonColor(crop.season)} text-white shadow-sm mt-1`}>
                              <CalendarDaysIcon className="w-3 h-3 mr-1" />
                              {crop.season}
                            </span>
                          </div>
                        </div>
                        
                        {/* Quick Action Icon */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <ChevronRightIcon className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                      </div>

                      {/* Stats Section */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl group-hover:from-green-50 group-hover:to-green-100 transition-all duration-300">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">pH Range</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900 bg-white px-2 py-1 rounded-lg shadow-sm">
                            {crop.soilPhRange ? `${crop.soilPhRange.min} - ${crop.soilPhRange.max}` : 'N/A'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Water Need</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${getWaterColor(crop.waterRequirement)}`}>
                            {crop.waterRequirement}
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl group-hover:from-purple-50 group-hover:to-purple-100 transition-all duration-300">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Growth Period</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900 bg-white px-2 py-1 rounded-lg shadow-sm">
                            {crop.growthDuration} days
                          </span>
                        </div>
                      </div>

                      {/* Description Section */}
                      {crop.description && (
                        <div className="border-t border-gray-100 pt-4 mb-4">
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 italic">
                            "{crop.description}"
                          </p>
                        </div>
                      )}

                      {/* Action Footer */}
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <ClockIcon className="w-4 h-4" />
                            <span>Quick Growing</span>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <div className="flex items-center space-x-1 text-green-600 font-medium text-sm">
                              <span>View Details</span>
                              <ArrowRightIcon className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-blue-400/0 to-purple-400/0 group-hover:from-green-400/5 group-hover:via-blue-400/5 group-hover:to-purple-400/5 rounded-2xl transition-all duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Crop Detail Modal */}
      <CropDetailModal
        crop={selectedCrop}
        isOpen={showDetailModal}
        onClose={closeDetailModal}
      />
    </div>
  );
};

export default CropManagement;
