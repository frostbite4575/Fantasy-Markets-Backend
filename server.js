// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Initialize Firebase (this connects to Firestore)
require('./config/firebase');

// Import routes
const worldRoutes = require('./routes/worldRoutes');
const cycleRoutes = require('./routes/cycleRoutes');

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/worlds', worldRoutes);
app.use('/api/cycles', cycleRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Fantasy Markets API is running',
    database: 'Firebase Firestore'
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Connected to Firebase Firestore');
});