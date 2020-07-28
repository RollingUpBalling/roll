const express = require('express');
const router = express.Router();

const betController = require('../controllers/bet');


router.post('/makeBet/',betController.makeBet)

module.exports = router