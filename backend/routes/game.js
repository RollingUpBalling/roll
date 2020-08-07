const express = require('express');
const isAuth = require('../middleware/auth')
const gameController = require('../controllers/game');
const { body } = require('express-validator')

const router = express.Router();


router.post('/createGame/', isAuth, gameController.createGame)
// router.get('/handleResults/',gameController.handleResults)
router.post(
    '/deposit',
    body('amount').isDecimal().custom(value => value > 0),
    isAuth,
    gameController.deposit
)

module.exports = router