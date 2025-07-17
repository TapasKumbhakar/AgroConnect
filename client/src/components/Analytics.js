import React, { useState, useEffect, useCallback } from 'react';
import { ChartBarIcon, UserGroupIcon, MapPinIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '../LanguageContext';

const Analytics = ({ showToast }) => {
  const { t } = useTranslation();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      }
    } catch (error) {
      showToast('Failed to load analytics', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="animate-fade-in flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="animate-fade-in text-center py-12">
        <ChartBarIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">No analytics data available.</p>
      </div>
    );
  }

  const statsCards = [
    {
      title: t('totalFarmers'),
      value: analyticsData.totalFarmers,
      icon: UserGroupIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      title: t('totalLandArea'),
      value: `${analyticsData.totalLandSize.toFixed(1)} ${t('acres')}`,
      icon: MapPinIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      title: t('cropVarieties'),
      value: analyticsData.cropDistribution.length,
      icon: BeakerIcon,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-100'
    },
    {
      title: t('locations'),
      value: analyticsData.locationDistribution.length,
      icon: ChartBarIcon,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-100'
    }
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">{t('farmAnalyticsDashboard')}</h1>
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{t('analyticsDesc')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6 hover:scale-105 transition-transform duration-200">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.bgColor} dark:bg-opacity-20 rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-transparent bg-gradient-to-r ${stat.color} bg-clip-text`} />
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Distribution */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">{t('popularCrops')}</h2>
          <div className="space-y-3">
            {analyticsData.cropDistribution.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8 transition-colors duration-300">{t('noCropData')}</p>
            ) : (
              analyticsData.cropDistribution.map((crop, index) => {
                const percentage = (crop.count / analyticsData.totalFarmers) * 100;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">{crop._id || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8 transition-colors duration-300">{crop.count}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Location Distribution */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">{t('farmerDistribution')}</h2>
          <div className="space-y-3">
            {analyticsData.locationDistribution.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8 transition-colors duration-300">{t('noLocationData')}</p>
            ) : (
              analyticsData.locationDistribution.map((location, index) => {
                const percentage = (location.count / analyticsData.totalFarmers) * 100;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">{location._id}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300">
                        <div 
                          className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8 transition-colors duration-300">{location.count}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">{t('averageLandSize')}</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 transition-colors duration-300">
              {analyticsData.totalFarmers > 0 
                ? (analyticsData.totalLandSize / analyticsData.totalFarmers).toFixed(1)
                : '0'
              }
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{t('acresPerFarmer')}</p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">{t('mostPopularCrop')}</h3>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
              {analyticsData.cropDistribution.length > 0 
                ? analyticsData.cropDistribution[0]._id || t('noData')
                : t('noData')
              }
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              {analyticsData.cropDistribution.length > 0 
                ? `${analyticsData.cropDistribution[0].count} ${t('farmers')}`
                : t('noData')
              }
            </p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">{t('dataHealth')}</h3>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center mx-auto mb-2 transition-colors duration-300">
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 font-medium transition-colors duration-300">
              {analyticsData.totalFarmers > 0 ? t('active') : t('noData')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
