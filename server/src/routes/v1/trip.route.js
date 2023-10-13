const express = require('express');
const router = express.Router();
const { generate } = require('../../controllers/trip.controller');
router.post('/', generate);

module.exports = router;