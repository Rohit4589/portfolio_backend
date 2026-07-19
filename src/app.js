const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/contact', contactRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.send('Portfolio Backend is running');
});

module.exports = app;
