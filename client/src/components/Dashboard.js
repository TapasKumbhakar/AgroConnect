import React, { useState, useEffect, useCallback } from 'react';
import { 
  UserGroupIcon, 
  ChartBarIcon, 
  BeakerIcon, 
  BookOpenIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  SparklesIcon,
  SunIcon,
  CloudIcon,
  BoltIcon,
  TrophyIcon,
  FireIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from '../LanguageContext';

const Dashboard = ({ showToast }) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalLandSize: 0,
    cropVarieties: 0,
    locations: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get weather greeting based on time
  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return { greeting: "Good Night", icon: "🌙", color: "from-indigo-600 to-purple-600" };
    if (hour < 12) return { greeting: "Good Morning", icon: "🌅", color: "from-orange-500 to-yellow-500" };
    if (hour < 17) return { greeting: "Good Afternoon", icon: "☀️", color: "from-yellow-500 to-orange-500" };
    if (hour < 21) return { greeting: "Good Evening", icon: "🌇", color: "from-orange-600 to-red-500" };
    return { greeting: "Good Night", icon: "🌙", color: "from-indigo-600 to-purple-600" };
  };

  const timeGreeting = getTimeBasedGreeting();

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalFarmers: data.totalFarmers,
          totalLandSize: data.totalLandSize,
          cropVarieties: data.cropDistribution.length,
          locations: data.locationDistribution.length
        });
        
        // Enhanced recent activity data with more variety
        setRecentActivity([
          { 
            type: 'farmer', 
            action: 'New farmer registered from Punjab', 
            time: '2 hours ago', 
            icon: UserGroupIcon,
            color: 'bg-blue-500',
            bgColor: 'bg-blue-50'
          },
          { 
            type: 'crop', 
            action: 'Wheat crop recommendation generated', 
            time: '4 hours ago', 
            icon: BeakerIcon,
            color: 'bg-green-500',
            bgColor: 'bg-green-50'
          },
          { 
            type: 'analytics', 
            action: 'Monthly analytics report updated', 
            time: '6 hours ago', 
            icon: ChartBarIcon,
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50'
          },
          { 
            type: 'resource', 
            action: 'New irrigation guide added', 
            time: '1 day ago', 
            icon: BookOpenIcon,
            color: 'bg-orange-500',
            bgColor: 'bg-orange-50'
          },
          { 
            type: 'achievement', 
            action: 'Milestone: 1000+ farmers reached!', 
            time: '2 days ago', 
            icon: TrophyIcon,
            color: 'bg-yellow-500',
            bgColor: 'bg-yellow-50'
          },
        ]);
      }
    } catch (error) {
      showToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const statsCards = [
    {
      title: t('totalFarmers'),
      value: stats.totalFarmers,
      icon: UserGroupIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      change: '+12%',
      changeType: 'increase',
      description: t('activeFarmersRegistered')
    },
    {
      title: t('totalLandArea'),
      value: `${stats.totalLandSize.toFixed(1)} ${t('acres')}`,
      icon: MapPinIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      change: '+8%',
      changeType: 'increase',
      description: t('underCultivation')
    },
    {
      title: t('cropVarieties'),
      value: stats.cropVarieties,
      icon: BeakerIcon,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-100',
      change: '+5%',
      changeType: 'increase',
      description: 'Different crops tracked'
    },
    {
      title: 'Locations',
      value: stats.locations,
      icon: ArrowTrendingUpIcon,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-100',
      change: '+15%',
      changeType: 'increase',
      description: 'Geographic coverage'
    }
  ];

  if (loading) {
    return (
      <div className="animate-fade-in min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 dark:border-green-700 border-t-green-600 dark:border-t-green-400 mx-auto mb-4"></div>
            <div className="absolute inset-0 animate-pulse">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto opacity-75"></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Loading Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400">Fetching your agricultural data...</p>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8 min-h-screen bg-gradient-to-br from-green-50/50 via-blue-50/30 to-purple-50/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 transition-colors duration-300">
      {/* Enhanced Welcome Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10 dark:from-green-400/5 dark:via-blue-400/5 dark:to-purple-400/5 backdrop-blur-3xl"></div>
        <div className="relative card p-8 border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className={`w-20 h-20 bg-gradient-to-br ${timeGreeting.color} rounded-3xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300`}>
                <span className="text-white text-3xl">{timeGreeting.icon}</span>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    {timeGreeting.greeting}!
                  </h1>
                  <SparklesIcon className="w-8 h-8 text-yellow-500 animate-pulse" />
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-1 transition-colors duration-300">
                  {t('welcome')}
                </p>
                <p className="text-gray-500 dark:text-gray-400 flex items-center transition-colors duration-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl flex items-center justify-center shadow-xl animate-float">
                  <span className="text-white text-4xl">🌾</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <SunIcon className="w-5 h-5 text-yellow-800" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Weather-like info bar */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 transition-colors duration-300">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CloudIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <span className="text-gray-600 dark:text-gray-300">System Status: </span>
                  <span className="text-green-600 dark:text-green-400 font-medium">All Systems Operational</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BoltIcon className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                  <span className="text-gray-600 dark:text-gray-300">Performance: </span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Excellent</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FireIcon className="w-5 h-5 text-red-500 dark:text-red-400" />
                <span className="text-gray-600 dark:text-gray-300">Activity: </span>
                <span className="text-green-600 dark:text-green-400 font-medium">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="group card p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.bgColor} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 text-transparent bg-gradient-to-r ${stat.color} bg-clip-text`} />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    stat.changeType === 'increase' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    <span className="flex items-center">
                      {stat.changeType === 'increase' ? '↗️' : '↘️'} {stat.change}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 dark:group-hover:from-gray-100 dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
                </div>
              </div>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Recent Activity */}
        <div className="lg:col-span-2">
          <div className="card p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center transition-colors duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center">
                  <BoltIcon className="w-5 h-5 text-white" />
                </div>
                Recent Activity
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Updates</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div 
                    key={index} 
                    className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl hover:from-white hover:to-gray-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-12 h-12 ${activity.bgColor} dark:bg-opacity-20 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${activity.color.replace('bg-', 'text-')} dark:opacity-80`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {activity.action}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                        {activity.type === 'achievement' && (
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                            <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Achievement</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-300 text-xs">→</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline transition-colors duration-200">
                View All Activity →
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="space-y-6">
          <div className="card p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl transition-colors duration-300">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg mr-3 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl border border-blue-200 dark:border-blue-700/50 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/50 dark:hover:to-blue-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <UserGroupIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Add Farmer</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Register new</p>
              </button>
              
              <button className="group p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl border border-green-200 dark:border-green-700/50 hover:from-green-100 hover:to-green-200 dark:hover:from-green-800/50 dark:hover:to-green-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <BeakerIcon className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-sm font-semibold text-green-900 dark:text-green-200">Add Crop</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Track new crop</p>
              </button>
              
              <button className="group p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl border border-purple-200 dark:border-purple-700/50 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/50 dark:hover:to-purple-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <ChartBarIcon className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-sm font-semibold text-purple-900 dark:text-purple-200">Analytics</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">View reports</p>
              </button>
              
              <button className="group p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl border border-orange-200 dark:border-orange-700/50 hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-800/50 dark:hover:to-orange-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <BookOpenIcon className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-sm font-semibold text-orange-900 dark:text-orange-200">Resources</p>
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Browse guides</p>
              </button>
            </div>
          </div>
          
          {/* New Performance Insights Card */}
          <div className="card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-0 shadow-xl transition-colors duration-300">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mr-3 flex items-center justify-center">
                <TrophyIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Performance</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Farm Efficiency</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">95%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-[95%] animate-pulse"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Data Accuracy</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">98%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-[98%] animate-pulse"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">User Satisfaction</span>
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">97%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full w-[97%] animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
