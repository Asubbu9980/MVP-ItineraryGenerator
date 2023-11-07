const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middleware/auth.middleware')
const { generate, getPopualarTripPlaces } = require('../../controllers/trip.controller');
router.post('/', authenticate, generate);
// router.get('/', getPopualarTripPlaces);

module.exports = router;