const express = require('express');
const isAuth = require('../middleware/auth')
const gameController = require('../controllers/game');
const { body } = require('express-validator')

const router = express.Router();


router.post('/createGame/',isAuth,gameController.createGame)
// router.get('/handleResults/',gameController.handleResults)

module.exports = router