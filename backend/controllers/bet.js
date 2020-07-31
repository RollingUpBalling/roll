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
        const game = await Game.findById(req.body.gameID)
        if (!game) {
            next(new HttpError('invalid id',400))
        }
        if (game.state !== 'makingBets') {
            next(new HttpError('cant make bet at this time',500))
        }
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
    } catch (error) {
        return next(new HttpError(error));
    }
}