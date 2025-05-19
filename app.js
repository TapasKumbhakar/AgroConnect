// Entry point for Agricultural Resource Management System (ARMS)

// === BACKEND === //
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');


dotenv.config();
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

// Sample Farmer model
const Farmer = mongoose.model('Farmer', new mongoose.Schema({
  name: String,
  landSize: Number,
  soilPh: Number,
  location: String,
  preferredCrop: String
}));

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.post('/api/farmers', async (req, res) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res.status(201).send(farmer);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.get('/api/farmers', async (req, res) => {
  const farmers = await Farmer.find();
  res.send(farmers);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
