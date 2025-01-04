// routes/userRoutes.js

const express = require('express');
const { registerUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');
const { getCurrentUser } = require('../controllers/userController'); // Import the function to fetch user data
const router = express.Router();

// Route for user registration (sign-up)
router.post('/signup', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to fetch the currently logged-in user's data
router.get('/me', getCurrentUser);

module.exports = router;
