const Game = require('../models/game')
const HttpError = require('../models/HttpError')
const io = require('../socket');
const { validationResult } = require('express-validator')


exports.createGame = async (req, res, next) => {
    try {
        const lastGame = await Game.findOne().sort({ _id: -1 })
        if (lastGame && lastGame.state !== 'finished') {
            return next(new HttpError('last game is not finished yet',500))
        }
        const game = await Game.create({
            koef: 2.28 //should be defined by some algoritm later 
        })
        const socket = io.getIO()
        socket.emit('recieveId',{
            'gameId' : game._id
        })
        setTimeout(() => {
            console.log('first timeout')
            game.state = 'active'
            game.save()
            socket.emit('newPhase',{
                state:'active'
            })
            setTimeout(() => {
                console.log('second timeout')
                game.state = 'finished'
                game.save()
                socket.emit('newPhase',{
                    state:'finished'
                })
            }, 30000);
        }, 30000);
        return res.status(201).json({'gameId' : game._id})

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}



