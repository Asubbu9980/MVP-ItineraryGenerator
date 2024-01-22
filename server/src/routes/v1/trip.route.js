const express = require('express');
const router = express.Router();
const { authenticate, checkJwt } = require('../../middleware/auth.middleware')
const { generate, getPopualarTripPlaces, getUserSearchHistory, generateusingVoice, generateChatbotMessages } = require('../../controllers/trip.controller');
router.post('/', authenticate, generate);
router.post('/voice', generateusingVoice);
router.post('/chatbot', generateChatbotMessages);
router.get('/', authenticate, getUserSearchHistory);

// router.get('/', getPopualarTripPlaces);

module.exports = router;