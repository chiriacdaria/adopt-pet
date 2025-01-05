const express = require('express');
const router = express.Router();
const { notifyAdoption } = require('../controllers/adoptionController');

// Define POST route for notify
router.post('/notify', notifyAdoption);

module.exports = router;
