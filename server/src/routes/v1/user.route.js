const express = require('express');
const router = express.Router();
const { create, authUser } = require('../../controllers/user.controller');
router.post('/', create);
router.post('/auth', authUser);


module.exports = router;