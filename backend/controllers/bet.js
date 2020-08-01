const Bet = require('../models/bet')
const Game = require('../models/game')
const HttpError = require('../models/HttpError')
const io = require('../socket');
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
            steamUsername: req.body.steamUsername,
            koef: req.body.koef,
            amount: req.body.amount
        })
        game.amount += bet.amount  
        game.bets.push(bet)
        game.save()
        const socket = io.getIO()
        socket.emit('addBet',{
            'bet':bet,
            'gameAmount': game.amount,
            'users':game.bets.length
        });
        return res.status(201).json({bet:bet});
    } catch (error) {
        console.log(error)
        return next(new HttpError('from bet controller'));
    }
}