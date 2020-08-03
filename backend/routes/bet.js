const express = require('express');
const router = express.Router();

const { body } = require('express-validator')

const betController = require('../controllers/bet');

const isAuth = require('../middleware/auth');
const { route } = require('./user');

router.post('/makeBet/',[
//    body('gameID').isString(),
    body('koef').isDecimal().custom(value => value > 1),
    body('amount').isDecimal().custom(value => value > 0)
],isAuth,betController.makeBet)

router.put('/retrieveWinningBet/',isAuth,betController.retrieveWinningBet)

module.exports = router