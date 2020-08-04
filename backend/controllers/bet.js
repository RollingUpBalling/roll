const Bet = require('../models/bet')
const Game = require('../models/game')
const HttpError = require('../models/HttpError')
const IO = require('../socket');
const { validationResult } = require('express-validator');
const clientSockets = require("socket.io-client")

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
        let bet = await Bet.create({
            user: req.body.userId,
            koef: req.body.koef,
            amount: req.body.amount
        })
        bet = await bet.populate('user').execPopulate()
        console.log(bet.amount)
        bet.user.balance = bet.user.balance - bet.amount
        game.amount += bet.amount  
        console.log(bet.user.balance)
        game.bets.push(bet)
        await game.save()
        await bet.user.save()
        const io = IO.getIO()
        io.on('connection',socket => {
            
            socket.on('subToUpdateBalance',async ()=> {
                const currentBet = await Bet.findById(bet._id).populate('user')
                console.log('this works_)')
                console.log(socket.id)
                console.log(currentBet.user.balance)
                socket.emit('updateBalance',{
                    newBalance:currentBet.user.balance
                })
            })
        })
        io.emit('addBet',{
            'bet':bet
        });
        return res.status(201).json({bet:bet});
    } catch (error) {
        console.log(error)
        return next(new HttpError('from bet controller'));
    }
}

exports.retrieveWinningBet = async (req,res,next) => {
    try {
        console.log(req.body.id)
        const bet = await Bet.findById(req.body.id).populate('user')
        if (!bet) {
            return next(new HttpError('Bet not found or game doesnt exist',400))
        }
        const socket = clientSockets("http://127.0.0.1:5000")
        socket.once('timerFinish',async data => {
            bet.retrieveKoef = parseFloat(data.koef / 1000 + '.' + data.koef % 1000 / 100)
            bet.user.balance += bet.amount * bet.retrieveKoef
            bet.won = true
            await bet.save()
            await bet.user.save()
            const io = IO.getIO()
            io.emit('changeBet',{
                bet:bet
            });
            socket.emit('SubToUpdateBalance',{balance:bet.user.balance})
            return res.status(200).json({
                balance:bet.user.balance
            })
        })
    }
    catch (e) {
        return next(new HttpError(e,500))
    }
}