const express = require('express');
const router = express.Router();
const { generate, getPopualarTripPlaces } = require('../../controllers/trip.controller');
router.post('/', generate);
// router.get('/', getPopualarTripPlaces);

module.exports = router;