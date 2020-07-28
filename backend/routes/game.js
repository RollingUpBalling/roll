const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/auth')
const gameController = require('../controllers/game');


router.put('/updateState/',isAuth,gameController.updateState)

module.exports = router