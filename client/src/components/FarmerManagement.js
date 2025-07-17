import React, { useState, useEffect, useCallback } from 'react';
import { 
  PlusIcon, 
  UserIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from '../LanguageContext';

const FarmerManagement = ({ showToast }) => {
  const { t } = useTranslation();
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    landSize: '',
    soilPh: '',
    location: '',
    preferredCrop: '',
    contactNumber: '',
    email: '',
    farmingExperience: '',
    irrigationType: 'Rain-fed',
    soilType: ''
  });

  const fetchFarmers = useCallback(async () => {
    try {
      const response = await fetch('/api/farmers');
      if (response.ok) {
        const data = await response.json();
        setFarmers(data);
      }
    } catch (error) {
      showToast('Failed to load farmers', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchFarmers();
  }, [fetchFarmers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingFarmer ? `/api/farmers/${editingFarmer._id}` : '/api/farmers';
      const method = editingFarmer ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showToast(editingFarmer ? 'Farmer updated successfully!' : 'Farmer registered successfully!');
        resetForm();
        fetchFarmers();
      } else {
        const error = await response.json();
        showToast(error.error || 'Operation failed', 'error');
      }
    } catch (error) {
      showToast('Network error occurred', 'error');
    }
  };

  const deleteFarmer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this farmer?')) return;
    
    try {
      const response = await fetch(`/api/farmers/${id}`, { method: 'DELETE' });
      if (response.ok) {
        showToast('Farmer deleted successfully!');
        fetchFarmers();
      } else {
        showToast('Failed to delete farmer', 'error');
      }
    } catch (error) {
      showToast('Network error occurred', 'error');
    }
  };

  const editFarmer = (farmer) => {
    setEditingFarmer(farmer);
    setFormData(farmer);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      landSize: '',
      soilPh: '',
      location: '',
      preferredCrop: '',
      contactNumber: '',
      email: '',
      farmingExperience: '',
      irrigationType: 'Rain-fed',
      soilType: ''
    });
    setEditingFarmer(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="animate-fade-in flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('farmerManagementTitle')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('farmerManagementDesc')}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>{t('addFarmer')}</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {editingFarmer ? t('editFarmer') : t('registerNewFarmer')}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span className="sr-only">Close</span>
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('name')} *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('landSize')} *</label>
              <input
                type="number"
                name="landSize"
                value={formData.landSize}
                onChange={handleInputChange}
                step="0.1"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('soilPh')} *</label>
              <input
                type="number"
                name="soilPh"
                value={formData.soilPh}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                max="14"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('location')} *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('preferredCrop')} *</label>
              <input
                type="text"
                name="preferredCrop"
                value={formData.preferredCrop}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contactNumber')}</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('farmingExperience')}</label>
              <input
                type="number"
                name="farmingExperience"
                value={formData.farmingExperience}
                onChange={handleInputChange}
                min="0"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('irrigationType')}</label>
              <select
                name="irrigationType"
                value={formData.irrigationType}
                onChange={handleInputChange}
                className="select-field"
              >
                <option value="Rain-fed">{t('rainFed')}</option>
                <option value="Drip">{t('drip')}</option>
                <option value="Sprinkler">{t('sprinkler')}</option>
                <option value="Flood">{t('flood')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('soilType')}</label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleInputChange}
                className="select-field"
              >
                <option value="">{t('selectSoilType')}</option>
                <option value="Clay">{t('clay')}</option>
                <option value="Sandy">{t('sandy')}</option>
                <option value="Loamy">{t('loamy')}</option>
                <option value="Silty">{t('silty')}</option>
                <option value="Peaty">{t('peaty')}</option>
                <option value="Chalky">{t('chalky')}</option>
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <button type="submit" className="btn-primary">
                {editingFarmer ? t('updateFarmer') : t('registerFarmer')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="ml-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">{t('noFarmersYet')}</p>
          </div>
        ) : (
          farmers.map((farmer) => (
            <div key={farmer._id} className="card p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{farmer.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{farmer.preferredCrop}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => editFarmer(farmer)}
                    className="p-1 text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteFarmer(farmer._id)}
                    className="p-1 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{farmer.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 dark:text-gray-500">🏞️</span>
                  <span className="text-gray-600 dark:text-gray-400">{farmer.landSize} acres</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 dark:text-gray-500">⚗️</span>
                  <span className="text-gray-600 dark:text-gray-400">pH: {farmer.soilPh}</span>
                </div>
                {farmer.contactNumber && (
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">{farmer.contactNumber}</span>
                  </div>
                )}
                {farmer.email && (
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">{farmer.email}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">💧</span>
                  <span className="text-gray-600">{farmer.irrigationType}</span>
                </div>
                {farmer.soilType && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">🌍</span>
                    <span className="text-gray-600">{farmer.soilType}</span>
                  </div>
                )}
                {farmer.farmingExperience && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">🎓</span>
                    <span className="text-gray-600">{farmer.farmingExperience} years</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FarmerManagement;
