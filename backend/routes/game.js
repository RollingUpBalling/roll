const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/auth')
const gameController = require('../controllers/game');
const { body } = require('express-validator')

router.put('/updateState/',[
    body('newState').isIn(['finished','active','makingBets'])
],isAuth,gameController.updateState)

module.exports = router