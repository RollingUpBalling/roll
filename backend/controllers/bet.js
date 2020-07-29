const Bet = require('../models/bet')
const Game = require('../models/game')
const HttpError = require('../models/HttpError')
const { validationResult } = require('express-validator');

exports.makeBet = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        let game = await Game.findOne().sort({ 'created_at': -1 })
        if (!game || game.state === 'finished') {
            game = await Game.create({
                koef: 2.28 //should be defined by some algoritm later 
            })
        }
        if (game.state === 'makingBets') {
            const bet = await Bet.create({
                steamUsername: req.body.steamUsername,
                koef: req.body.koef,
                amount: req.body.amount
            })
            game.amount += bet.amount
            game.bets.push(bet)
            game.save()
            res.status(201).json({
                bet: bet
            })
        }
        else if (game.state === 'active') {
            res.status(403).json({
                error: 'cant place bet at this time, wait for another game'
            })
        }
    } catch (error) {
        throw new HttpError(error)
    }

}