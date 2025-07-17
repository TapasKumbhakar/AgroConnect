const mongoose = require('mongoose');

// Farmer Schema
const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  landSize: {
    type: Number,
    required: [true, 'Land size is required'],
    min: [0, 'Land size cannot be negative']
  },
  soilPh: {
    type: Number,
    required: [true, 'Soil pH is required'],
    min: [0, 'Soil pH cannot be negative'],
    max: [14, 'Soil pH cannot exceed 14']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  preferredCrop: {
    type: String,
    required: [true, 'Preferred crop is required'],
    trim: true
  },
  contactNumber: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  farmingExperience: {
    type: Number,
    min: 0
  },
  irrigationType: {
    type: String,
    enum: ['Drip', 'Sprinkler', 'Flood', 'Rain-fed'],
    default: 'Rain-fed'
  },
  soilType: {
    type: String,
    enum: ['Clay', 'Sandy', 'Loamy', 'Silty', 'Peaty', 'Chalky']
  }
}, {
  timestamps: true
});

// Crop Schema
const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  season: {
    type: String,
    enum: ['Kharif', 'Rabi', 'Zaid', 'Year Round'],
    required: true
  },
  soilPhRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  waterRequirement: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  growthDuration: {
    type: Number, // in days
    required: true
  },
  description: String
}, {
  timestamps: true
});

// Resource Schema
const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Article', 'Video', 'Guide', 'Tool'],
    required: true
  },
  category: {
    type: String,
    enum: ['Farming Techniques', 'Pest Control', 'Soil Management', 'Irrigation', 'Marketing'],
    required: true
  },
  content: String,
  url: String,
  author: String
}, {
  timestamps: true
});

const Farmer = mongoose.model('Farmer', farmerSchema);
const Crop = mongoose.model('Crop', cropSchema);
const Resource = mongoose.model('Resource', resourceSchema);

module.exports = {
  Farmer,
  Crop,
  Resource
};