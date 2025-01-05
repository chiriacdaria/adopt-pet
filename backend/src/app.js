const express = require('express');
const cors = require('cors');  // Import cors middleware
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const animalRoutes = require('./routes/animalRoutes'); // Import the animal routes
const favoritesRoutes = require('./routes/favoritesRoutes'); // Import the favorites route
require('dotenv').config();

const app = express();

// Enable CORS for all domains (optional, but allows all origins)
// app.use(cors());

// Alternatively, you can restrict CORS to a specific origin (frontend)
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json()); // Middleware to parse JSON request bodies

// Register the user and animal routes
app.use('/api', userRoutes);
app.use('/api', animalRoutes);
app.use('/api/favorites', favoritesRoutes); // Use the favorites route

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
