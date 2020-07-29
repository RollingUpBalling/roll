const express = require('express');
const router = express.Router();

const { body } = require('express-validator')

const betController = require('../controllers/bet');

const isAuth = require('../middleware/auth')

router.post('/makeBet/',[
    body('steamUsername').isString(),
    body('koef').isDecimal().custom(value => value > 0),
    body('amount').isDecimal().custom(value => value > 0)
],isAuth,betController.makeBet)

module.exports = router