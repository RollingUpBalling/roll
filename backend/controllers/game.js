const Game = require('../models/game')
const HttpError = require('../models/HttpError')
const io = require('../socket');
const { validationResult } = require('express-validator')

exports.updateState = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error("invalid state, available options: 'finished', 'active', 'makingBets'")
        error.statusCode = 400
        next(error)
    }
    try {
        const game = await Game.findOne().sort({ 'created_at': -1 })
        if (!game) {
            next(new Error('no game found'))
        }
        game.state = req.body.newState
        game.save()
        res.sendStatus(204)
    } catch (error) {
        next(error);
    }
}




exports.createGame = async (req, res, next) => {
    try {
        const lastGame = await Game.findOne().sort({ _id: -1 })
        console.log(lastGame)
        if (lastGame && lastGame.state !== 'finished') {
            next(new HttpError('last game is not finished yet',500))
        }
        const game = await Game.create({
            koef: 2.28 //should be defined by some algoritm later 
        })
        const socket = io.getIO()
        // socket.emit('connection', {
        //     'gameId' : game._id
        // })
        socket.emit('recieveId',{
            'gameId' : game._id
        })
        return res.sendStatus(201)

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}

exports.moveToActiveState = async (req, res, next) => {
    try {
        const game = await Game.findById(req.body.gameID)
        if (!game) {
            const error = new Error('game does not exist')
            error.statusCode = 400
            next(error)
        }
        if (game.state !== 'makingBets') {
            const error = new Error(`cant move to active in '${game.state}' state`)
            error.statusCode = 400
            next(error)
        }
        setTimeout(() => {
            game.state = 'active'
            game.save()
            res.status(200).json({
                gameID: game._id,
                state: game.state
            })
        }, 20000)

    } catch (error) {
        next(error)
    }
}


