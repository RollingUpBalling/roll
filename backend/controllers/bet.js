const Bet = require('../models/bet')
const Game = require('../models/game')
const User = require('../models/user')
const HttpError = require('../models/HttpError')
const IO = require('../socket');
const { validationResult } = require('express-validator');

exports.makeBet = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError('Validation error',500))
    }
    try {
        const game = await Game.findById(req.body.gameID)
        if (!game) {
            return next(new HttpError('invalid id',400))
        }
        if (game.state !== 'makingBets') {
            return next(new HttpError('cant make bet at this time',500))
        }
        const bet = await Bet.create({
            user: req.body.userId,
            koef: req.body.koef,
            amount: req.body.amount
        })
        game.amount += bet.amount  
        game.bets.push(bet)
        game.save()
        const io = IO.getIO()
        io.emit('addBet',{
            'bet':bet
        });
        return res.status(201).json({bet:bet});
    } catch (error) {
        console.log(error)
        return next(new HttpError('from bet controller'));
    }
}

exports.takeBet = async (req,res,next) => {
    try {
        const bet = await Bet.findById(req.body.id)
        if (!bet) {
            return next(new HttpError('Bet not found or game doesnt exist',400))
        }
        
        bet.won = true
        await bet.save()

    }
    catch (e) {
        return next(new HttpError(e,500))
    }
}