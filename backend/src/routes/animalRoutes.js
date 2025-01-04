const express = require('express');
const router = express.Router();
const { createAnimal, getAnimalById, updateAnimal, getAllAnimals, deleteAnimal, getAdoptedAnimalsByUser } = require('../controllers/animalController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/animals', authenticate, createAnimal); // Create new animal
router.get('/animals/:id', authenticate, getAnimalById); // Get animal by ID
router.put('/animals/:id', authenticate, updateAnimal); // Update animal
router.delete('/animals/:id', authenticate, deleteAnimal); // Update animal
router.get('/animals', authenticate, getAllAnimals); // Get all animals for a user
router.get('/animals-adoption-history', authenticate, getAdoptedAnimalsByUser);

module.exports = router;
