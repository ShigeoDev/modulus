require('dotenv').config();
const express = require('express');
const cors = require('cors');
const InfoModel = require('./models/info.js');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json('Test Success');
});

app.post('/api/button', async (req, res) => {
  try {
    const { info } = req.body;
    const newInfo = await InfoModel.create({ info });
    res.json({ message: 'Info saved successfully', data: newInfo });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/info', async (req, res) => {
  const info = await InfoModel.find();
  res.json(info);
});

app.listen(3000);
