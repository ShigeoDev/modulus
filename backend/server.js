import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import login from './login/login.js';

dotenv.config();

const app = express();

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.use('/api/login', login);

app.get('/api', (res) => {
  res.send('API is running');
})

app.listen(5173);

