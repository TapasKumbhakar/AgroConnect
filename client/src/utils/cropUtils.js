// Crop utility functions for categorization and styling

// Define crop categories
export const cropCategories = {
  'Cereals & Grains': ['Rice', 'Wheat', 'Maize (Corn)', 'Barley', 'Oats', 'Millet', 'Sorghum', 'Quinoa'],
  'Legumes & Pulses': ['Soybeans', 'Chickpea', 'Lentils', 'Black Gram', 'Green Gram', 'Field Peas', 'Kidney Beans'],
  'Vegetables': ['Tomato', 'Potato', 'Onion', 'Cabbage', 'Cauliflower', 'Carrot', 'Spinach', 'Lettuce', 'Broccoli', 'Bell Pepper', 'Cucumber', 'Eggplant', 'Okra'],
  'Cash Crops': ['Cotton', 'Sugarcane', 'Jute', 'Tobacco'],
  'Oilseeds': ['Sunflower', 'Mustard', 'Groundnut', 'Sesame', 'Safflower'],
  'Fruits': ['Watermelon', 'Muskmelon', 'Strawberry'],
  'Spices & Herbs': ['Turmeric', 'Ginger', 'Garlic', 'Coriander', 'Fenugreek'],
  'Forage Crops': ['Alfalfa', 'Clover', 'Fodder Maize']
};

// Function to get crop category
export const getCropCategory = (cropName) => {
  for (const [category, crops] of Object.entries(cropCategories)) {
    if (crops.includes(cropName)) {
      return category;
    }
  }
  return 'Other';
};

// Function to get category color
export const getCategoryColor = (category) => {
  const colors = {
    'Cereals & Grains': 'from-amber-400 to-yellow-600',
    'Legumes & Pulses': 'from-green-400 to-emerald-600',
    'Vegetables': 'from-green-500 to-lime-600',
    'Cash Crops': 'from-purple-400 to-violet-600',
    'Oilseeds': 'from-orange-400 to-red-500',
    'Fruits': 'from-pink-400 to-rose-600',
    'Spices & Herbs': 'from-indigo-400 to-purple-600',
    'Forage Crops': 'from-teal-400 to-cyan-600',
    'Other': 'from-gray-400 to-gray-600'
  };
  return colors[category] || colors['Other'];
};

// Function to group crops by category
export const groupCropsByCategory = (crops) => {
  const grouped = {};
  crops.forEach(crop => {
    const category = getCropCategory(crop.name);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(crop);
  });
  return grouped;
};

// Function to get category icon
export const getCategoryIcon = (category) => {
  const icons = {
    'Cereals & Grains': '🌾',
    'Legumes & Pulses': '🫘',
    'Vegetables': '🥕',
    'Cash Crops': '💰',
    'Oilseeds': '🌻',
    'Fruits': '🍓',
    'Spices & Herbs': '🌿',
    'Forage Crops': '🌱',
    'Other': '🌾'
  };
  return icons[category] || icons['Other'];
};
