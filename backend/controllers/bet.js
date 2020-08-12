const Bet = require('../models/bet')
const Game = require('../models/game')
const HttpError = require('../models/HttpError')
const IO = require('../socket');
const { validationResult } = require('express-validator');
const clientSockets = require("socket.io-client")

exports.makeBet = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError('Enter amount of bet',500))
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
        
        bet.user.balance = bet.user.balance - bet.amount        // getting user balance
        game.amount += bet.amount  
        
        game.bets.push(bet)             // push saved bet to game
        await game.save()
        await bet.user.save()
        const io = IO.getIO()
        io.emit('addBet',{
            'bet':bet
        });

        const socket = clientSockets("http://127.0.0.1:5000")
        socket.on('timerFinish',async (data) => {
            const currentBet = await Bet.findById(bet._id).populate('user')
              
            const currentKoef = parseFloat(data.koef / 1000 + '.' + data.koef % 1000 / 100)
            
            if (currentBet.koef <= currentKoef && !currentBet.won) {
                socket.off('timerFinish')
                console.log(bet)
                currentBet.user.balance += currentBet.amount * currentBet.koef      
                currentBet.won = true                            
                await bet.save()
                await bet.user.save()
                const io = IO.getIO()
                io.emit('changeBet',{
                    bet:currentBet                         
                });
                io.emit(currentBet.user.id,currentBet.user.balance)
                
            }
        })
        return res.status(201).json({bet:bet});
    } catch (error) {   
        console.log(error)
        return next(new HttpError('from bet controller'));
    }
}

exports.retrieveWinningBet = async (req,res,next) => {
    try {
        
        const bet = await Bet.findById(req.body.id).populate('user')    
        if (!bet) {
            return next(new HttpError('Bet not found or game doesnt exist',400))
        }
        if (bet.retrieveKoef || bet.won) {
            return next(new HttpError('Bet already retrieved',500))
        }
        const socket = clientSockets("http://127.0.0.1:5000")
        socket.once('timerFinish',async (data) => {           // listens socket only once 
            bet.retrieveKoef = parseFloat(data.koef / 1000 + '.' + data.koef % 1000 / 100)
            bet.user.balance += bet.amount * bet.retrieveKoef       // getting koef of the bet 
            bet.won = true                              // and adding user balance
            await bet.save()
            await bet.user.save()
            const io = IO.getIO()
            io.emit('changeBet',{
                bet:bet                         
            });
            return res.status(200).json({
                balance:bet.user.balance
            })
        })
    }
    catch (e) {
        return next(new HttpError(e,500))
    }
}