const passport = require('passport')
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/auth/',passport.authenticate('steam',{session:false}))
router.get('/auth/return/',passport.authenticate('steam', { failureRedirect: '/error',session:false }),userController.SignIn)
router.get('/getUser/:id/',userController.GetUser)

module.exports = router