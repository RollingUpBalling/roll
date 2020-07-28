const express = require('express');
const router = express.Router();

const betController = require('../controllers/bet');

const isAuth = require('../middleware/auth')

router.post('/makeBet/',isAuth,betController.makeBet)

module.exports = router