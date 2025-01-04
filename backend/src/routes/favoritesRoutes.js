// /routes/favorites.js

const express = require('express');
const router = express.Router();
const { addToFavorites, removeFromFavorites , checkFavorite, getUserFavorites} = require('../controllers/favorites');

// Route to add an animal to favorites
router.post('/add-to-favorites', addToFavorites);

// Route to remove an animal from favorites
router.post('/remove-from-favorites', removeFromFavorites);

router.post('/check-favorite', checkFavorite);

router.get('/:userId', getUserFavorites);

module.exports = router;
