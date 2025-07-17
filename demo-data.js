// Demo data for Agricultural Resource Management System
// This file contains sample data that can be used to populate the database

const sampleFarmers = [
  {
    name: "John Smith",
    landSize: 25.5,
    soilPh: 6.8,
    location: "Iowa, USA",
    preferredCrop: "Corn",
    contactNumber: "+1-555-0123",
    email: "john.smith@email.com",
    farmingExperience: 15,
    irrigationType: "Drip",
    soilType: "Loamy"
  },
  {
    name: "Maria Garcia",
    landSize: 18.2,
    soilPh: 6.2,
    location: "California, USA",
    preferredCrop: "Tomatoes",
    contactNumber: "+1-555-0456",
    email: "maria.garcia@email.com",
    farmingExperience: 8,
    irrigationType: "Sprinkler",
    soilType: "Sandy"
  },
  {
    name: "Rajesh Patel",
    landSize: 12.0,
    soilPh: 7.1,
    location: "Gujarat, India",
    preferredCrop: "Cotton",
    contactNumber: "+91-98765-43210",
    email: "rajesh.patel@email.com",
    farmingExperience: 20,
    irrigationType: "Flood",
    soilType: "Clay"
  }
];

const sampleCrops = [
  {
    name: "Rice",
    season: "Monsoon",
    soilPhRange: { min: 6.0, max: 7.0 },
    waterRequirement: "High",
    growthDuration: 120,
    description: "Staple food crop requiring flooded fields and warm climate"
  },
  {
    name: "Wheat",
    season: "Winter",
    soilPhRange: { min: 6.0, max: 7.5 },
    waterRequirement: "Medium",
    growthDuration: 120,
    description: "Major cereal crop, drought resistant and cold tolerant"
  },
  {
    name: "Corn",
    season: "Summer",
    soilPhRange: { min: 6.0, max: 6.8 },
    waterRequirement: "Medium",
    growthDuration: 90,
    description: "Versatile crop used for food, feed, and industrial purposes"
  },
  {
    name: "Tomato",
    season: "Summer",
    soilPhRange: { min: 6.0, max: 6.8 },
    waterRequirement: "Medium",
    growthDuration: 90,
    description: "High-value vegetable crop rich in vitamins and antioxidants"
  },
  {
    name: "Potato",
    season: "Winter",
    soilPhRange: { min: 5.5, max: 6.5 },
    waterRequirement: "Medium",
    growthDuration: 90,
    description: "Important tuber crop, high in carbohydrates and minerals"
  },
  {
    name: "Cotton",
    season: "Summer",
    soilPhRange: { min: 6.5, max: 8.0 },
    waterRequirement: "High",
    growthDuration: 180,
    description: "Major fiber crop requiring warm climate and adequate moisture"
  },
  {
    name: "Soybean",
    season: "Summer",
    soilPhRange: { min: 6.0, max: 7.0 },
    waterRequirement: "Medium",
    growthDuration: 100,
    description: "Protein-rich legume crop that fixes nitrogen in soil"
  },
  {
    name: "Barley",
    season: "Winter",
    soilPhRange: { min: 6.5, max: 7.8 },
    waterRequirement: "Low",
    growthDuration: 100,
    description: "Hardy cereal crop used for food, feed, and brewing"
  }
];

const sampleResources = [
  {
    title: "Organic Farming Techniques",
    type: "Guide",
    category: "Farming Techniques",
    content: "Comprehensive guide covering composting, crop rotation, natural fertilizers, and sustainable farming practices for improved soil health and crop yield.",
    author: "Agricultural Extension Office"
  },
  {
    title: "Integrated Pest Management (IPM)",
    type: "Article",
    category: "Pest Control",
    content: "Learn about biological, cultural, and chemical methods for controlling pests while minimizing environmental impact and maintaining beneficial insects.",
    author: "Dr. Sarah Johnson"
  },
  {
    title: "Soil Testing and Analysis",
    type: "Video",
    category: "Soil Management",
    content: "Step-by-step guide on how to collect soil samples, interpret soil test results, and make informed decisions about fertilization and soil amendments.",
    url: "https://example.com/soil-testing-video",
    author: "Farm University Extension"
  },
  {
    title: "Drip Irrigation System Setup",
    type: "Guide",
    category: "Irrigation",
    content: "Complete installation and maintenance guide for drip irrigation systems, including component selection, layout design, and troubleshooting tips.",
    author: "Irrigation Specialists Inc."
  },
  {
    title: "Farm-to-Market Strategies",
    type: "Article",
    category: "Marketing",
    content: "Effective strategies for marketing farm products directly to consumers, including farmers markets, CSA programs, and online sales platforms.",
    author: "Marketing Expert Team"
  },
  {
    title: "Crop Rotation Planning Tool",
    type: "Tool",
    category: "Farming Techniques",
    content: "Interactive tool to help farmers plan effective crop rotation schedules that maintain soil fertility and reduce pest and disease pressure.",
    url: "https://example.com/crop-rotation-tool",
    author: "AgTech Solutions"
  },
  {
    title: "Weather-Based Farming Decisions",
    type: "Article",
    category: "Farming Techniques",
    content: "How to use weather data and forecasts to make informed decisions about planting, irrigation, harvesting, and pest management.",
    author: "Climate Agricultural Specialist"
  },
  {
    title: "Composting for Beginners",
    type: "Video",
    category: "Soil Management",
    content: "Learn the basics of composting organic matter to create nutrient-rich soil amendments that improve soil structure and fertility.",
    url: "https://example.com/composting-basics",
    author: "Sustainable Agriculture Center"
  }
];

module.exports = {
  sampleFarmers,
  sampleCrops,
  sampleResources
};
