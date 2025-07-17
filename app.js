// Entry point for Agricultural Resource Management System (ARMS)

// === BACKEND === //
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Import models
const { Farmer, Crop, Resource } = require('./models/user');

dotenv.config({ path: '.env/.env' });
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('MongoDB connected'));
db.on('error', (err) => console.error('MongoDB connection error:', err));

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Farmer routes
app.post('/api/farmers', async (req, res) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res.status(201).json(farmer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/farmers', async (req, res) => {
  try {
    const farmers = await Farmer.find().sort({ createdAt: -1 });
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/farmers/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    res.json(farmer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/farmers/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    res.json(farmer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/farmers/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndDelete(req.params.id);
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    res.json({ message: 'Farmer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crop routes
app.post('/api/crops', async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    res.status(201).json(crop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/crops', async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crop recommendation based on soil pH
app.get('/api/crops/recommendations/:soilPh', async (req, res) => {
  try {
    const soilPh = parseFloat(req.params.soilPh);
    const crops = await Crop.find({
      'soilPhRange.min': { $lte: soilPh },
      'soilPhRange.max': { $gte: soilPh }
    });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seed crops database with comprehensive data
app.post('/api/crops/seed', async (req, res) => {
  try {
    // Clear existing crops
    await Crop.deleteMany({});
    
    const crops = [
      // Cereals
      {
        name: 'Rice',
        season: 'Kharif',
        soilPhRange: { min: 5.5, max: 7.0 },
        waterRequirement: 'High',
        growthDuration: 120,
        description: 'Staple food crop, requires flooded fields, high water needs'
      },
      {
        name: 'Wheat',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Medium',
        growthDuration: 120,
        description: 'Major cereal crop, cool season, moderate water requirements'
      },
      {
        name: 'Maize (Corn)',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Medium',
        growthDuration: 90,
        description: 'Versatile crop, warm season, good for fodder and food'
      },
      {
        name: 'Barley',
        season: 'Rabi',
        soilPhRange: { min: 6.2, max: 7.8 },
        waterRequirement: 'Low',
        growthDuration: 100,
        description: 'Hardy cereal, drought tolerant, used for malt and feed'
      },
      {
        name: 'Oats',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'Medium',
        growthDuration: 90,
        description: 'Cool season cereal, nutritious grain and excellent fodder'
      },
      {
        name: 'Millet',
        season: 'Kharif',
        soilPhRange: { min: 5.5, max: 7.5 },
        waterRequirement: 'Low',
        growthDuration: 70,
        description: 'Drought resistant, nutritious small grain, climate resilient'
      },
      {
        name: 'Sorghum',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 8.0 },
        waterRequirement: 'Low',
        growthDuration: 100,
        description: 'Drought tolerant grain, excellent for dry regions'
      },
      {
        name: 'Quinoa',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 8.5 },
        waterRequirement: 'Low',
        growthDuration: 120,
        description: 'Superfood grain, high protein, adaptable to various conditions'
      },

      // Legumes & Pulses
      {
        name: 'Soybeans',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'Medium',
        growthDuration: 100,
        description: 'High protein legume, nitrogen fixing, oil-rich seeds'
      },
      {
        name: 'Chickpea',
        season: 'Rabi',
        soilPhRange: { min: 6.2, max: 7.8 },
        waterRequirement: 'Low',
        growthDuration: 90,
        description: 'Protein-rich pulse, drought tolerant, nitrogen fixing'
      },
      {
        name: 'Lentils',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Low',
        growthDuration: 85,
        description: 'Nutritious pulse, fast growing, improves soil fertility'
      },
      {
        name: 'Black Gram',
        season: 'Kharif',
        soilPhRange: { min: 6.5, max: 7.5 },
        waterRequirement: 'Medium',
        growthDuration: 75,
        description: 'High protein pulse, monsoon crop, nitrogen fixing'
      },
      {
        name: 'Green Gram',
        season: 'Kharif',
        soilPhRange: { min: 6.2, max: 7.2 },
        waterRequirement: 'Medium',
        growthDuration: 60,
        description: 'Fast growing pulse, short duration, drought tolerant'
      },
      {
        name: 'Field Peas',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Medium',
        growthDuration: 80,
        description: 'Cool season legume, good cover crop, nitrogen fixing'
      },
      {
        name: 'Kidney Beans',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'Medium',
        growthDuration: 90,
        description: 'Popular pulse, climbing variety available, protein rich'
      },

      // Vegetables
      {
        name: 'Tomato',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'High',
        growthDuration: 80,
        description: 'Popular vegetable, high water needs, warm season crop'
      },
      {
        name: 'Potato',
        season: 'Rabi',
        soilPhRange: { min: 5.5, max: 6.5 },
        waterRequirement: 'Medium',
        growthDuration: 90,
        description: 'Staple vegetable, cool season, loose soil preferred'
      },
      {
        name: 'Onion',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Medium',
        growthDuration: 120,
        description: 'Essential vegetable, long growing season, bulb crop'
      },
      {
        name: 'Cabbage',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'High',
        growthDuration: 90,
        description: 'Cool season vegetable, high water needs, leafy crop'
      },
      {
        name: 'Cauliflower',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'High',
        growthDuration: 85,
        description: 'Cool season brassica, requires consistent moisture'
      },
      {
        name: 'Carrot',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'Medium',
        growthDuration: 70,
        description: 'Root vegetable, deep loose soil needed, vitamin A rich'
      },
      {
        name: 'Spinach',
        season: 'Rabi',
        soilPhRange: { min: 6.5, max: 7.5 },
        waterRequirement: 'Medium',
        growthDuration: 45,
        description: 'Fast growing leafy green, cool season, iron rich'
      },
      {
        name: 'Lettuce',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'High',
        growthDuration: 50,
        description: 'Crisp leafy vegetable, cool season, quick harvest'
      },
      {
        name: 'Broccoli',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'High',
        growthDuration: 80,
        description: 'Nutritious brassica, cool season, consistent water needs'
      },
      {
        name: 'Bell Pepper',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'High',
        growthDuration: 75,
        description: 'Warm season vegetable, high water needs, vitamin C rich'
      },
      {
        name: 'Cucumber',
        season: 'Zaid',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'High',
        growthDuration: 60,
        description: 'Vine crop, high water content, warm season'
      },
      {
        name: 'Eggplant',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'Medium',
        growthDuration: 85,
        description: 'Heat loving vegetable, long harvest period'
      },
      {
        name: 'Okra',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Medium',
        growthDuration: 60,
        description: 'Heat tolerant vegetable, drought resistant, nutritious pods'
      },

      // Cash Crops
      {
        name: 'Cotton',
        season: 'Kharif',
        soilPhRange: { min: 5.8, max: 8.0 },
        waterRequirement: 'High',
        growthDuration: 180,
        description: 'Major fiber crop, long growing season, warm climate needs'
      },
      {
        name: 'Sugarcane',
        season: 'Year Round',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'High',
        growthDuration: 365,
        description: 'Perennial crop, very high water needs, sugar production'
      },
      {
        name: 'Jute',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'High',
        growthDuration: 120,
        description: 'Fiber crop, monsoon dependent, flood tolerant'
      },
      {
        name: 'Tobacco',
        season: 'Rabi',
        soilPhRange: { min: 5.5, max: 7.3 },
        waterRequirement: 'Medium',
        growthDuration: 90,
        description: 'Commercial crop, careful curing needed, warm season'
      },

      // Oilseeds
      {
        name: 'Sunflower',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Medium',
        growthDuration: 90,
        description: 'Oilseed crop, drought tolerant, edible oil production'
      },
      {
        name: 'Mustard',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Low',
        growthDuration: 90,
        description: 'Cool season oilseed, drought tolerant, oil and greens'
      },
      {
        name: 'Groundnut',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'Medium',
        growthDuration: 100,
        description: 'Leguminous oilseed, nitrogen fixing, underground pods'
      },
      {
        name: 'Sesame',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Low',
        growthDuration: 85,
        description: 'Drought tolerant oilseed, high quality oil, heat resistant'
      },
      {
        name: 'Safflower',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Low',
        growthDuration: 120,
        description: 'Drought resistant oilseed, deep taproot, quality oil'
      },

      // Fruits
      {
        name: 'Watermelon',
        season: 'Zaid',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'High',
        growthDuration: 80,
        description: 'Vine fruit, high water content, warm season crop'
      },
      {
        name: 'Muskmelon',
        season: 'Zaid',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Medium',
        growthDuration: 70,
        description: 'Sweet vine fruit, warm season, good drainage needed'
      },
      {
        name: 'Strawberry',
        season: 'Rabi',
        soilPhRange: { min: 5.5, max: 6.5 },
        waterRequirement: 'High',
        growthDuration: 60,
        description: 'Perennial fruit, cool season harvest, high value crop'
      },

      // Spices & Herbs
      {
        name: 'Turmeric',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'High',
        growthDuration: 240,
        description: 'Rhizome spice, long growing period, medicinal properties'
      },
      {
        name: 'Ginger',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'High',
        growthDuration: 240,
        description: 'Rhizome spice, shade tolerant, well-drained soil needed'
      },
      {
        name: 'Garlic',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Medium',
        growthDuration: 150,
        description: 'Bulb spice, cool season, long storage life'
      },
      {
        name: 'Coriander',
        season: 'Rabi',
        soilPhRange: { min: 6.5, max: 7.5 },
        waterRequirement: 'Medium',
        growthDuration: 45,
        description: 'Fast growing herb, cool season, leaves and seeds used'
      },
      {
        name: 'Fenugreek',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'Low',
        growthDuration: 90,
        description: 'Leguminous herb, drought tolerant, medicinal uses'
      },

      // Forage Crops
      {
        name: 'Alfalfa',
        season: 'Year Round',
        soilPhRange: { min: 6.5, max: 7.5 },
        waterRequirement: 'High',
        growthDuration: 90,
        description: 'Perennial forage, high protein, nitrogen fixing'
      },
      {
        name: 'Clover',
        season: 'Rabi',
        soilPhRange: { min: 6.0, max: 7.0 },
        waterRequirement: 'Medium',
        growthDuration: 60,
        description: 'Leguminous forage, soil improver, nitrogen fixing'
      },
      {
        name: 'Fodder Maize',
        season: 'Kharif',
        soilPhRange: { min: 6.0, max: 7.5 },
        waterRequirement: 'High',
        growthDuration: 70,
        description: 'High yielding fodder, warm season, livestock feed'
      }
    ];

    await Crop.insertMany(crops);
    res.status(201).json({ 
      message: `Successfully seeded ${crops.length} crops to the database`,
      count: crops.length 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get crops by season
app.get('/api/crops/season/:season', async (req, res) => {
  try {
    const season = req.params.season;
    const crops = await Crop.find({ season: season }).sort({ name: 1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get crops by water requirement
app.get('/api/crops/water/:requirement', async (req, res) => {
  try {
    const waterRequirement = req.params.requirement;
    const crops = await Crop.find({ waterRequirement: waterRequirement }).sort({ name: 1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get crops by growth duration (fast, medium, slow)
app.get('/api/crops/duration/:type', async (req, res) => {
  try {
    const type = req.params.type;
    let query = {};
    
    switch(type) {
      case 'fast':
        query = { growthDuration: { $lte: 60 } };
        break;
      case 'medium':
        query = { growthDuration: { $gt: 60, $lte: 120 } };
        break;
      case 'slow':
        query = { growthDuration: { $gt: 120 } };
        break;
    }
    
    const crops = await Crop.find(query).sort({ growthDuration: 1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search crops by name
app.get('/api/crops/search/:query', async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const crops = await Crop.find({
      name: { $regex: searchQuery, $options: 'i' }
    }).sort({ name: 1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Resource routes
app.post('/api/resources', async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/resources', async (req, res) => {
  try {
    const { category, type } = req.query;
    let query = {};
    if (category) query.category = category;
    if (type) query.type = type;
    
    const resources = await Resource.find(query).sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics route
app.get('/api/analytics', async (req, res) => {
  try {
    const totalFarmers = await Farmer.countDocuments();
    const totalLandSize = await Farmer.aggregate([
      { $group: { _id: null, total: { $sum: '$landSize' } } }
    ]);
    const cropDistribution = await Farmer.aggregate([
      { $group: { _id: '$preferredCrop', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const locationDistribution = await Farmer.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalFarmers,
      totalLandSize: totalLandSize[0]?.total || 0,
      cropDistribution,
      locationDistribution
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
