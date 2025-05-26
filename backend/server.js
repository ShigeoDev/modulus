import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import login from './login/login.js';
import register from './register/register.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/login', login);
app.use('/api/register', register);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// API health check
app.get('/api', (req, res) => {
  res.send('API is running');
});

// Serve index.html for all other routes (for client-side routing)
app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

