const express = require('express');
const isAuth = require('../middleware/auth')
const gameController = require('../controllers/game');
const { body } = require('express-validator')

const router = express.Router();


router.put('/updateState/',[
    body('newState').isIn(['finished','active','makingBets'])
],isAuth,gameController.updateState)

router.post('/createGame/',isAuth,gameController.createGame)

module.exports = router