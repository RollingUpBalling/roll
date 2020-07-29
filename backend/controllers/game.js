const Game = require('../models/game')
const HttpError = require('../models/HttpError')
const { validationResult } = require('express-validator')

exports.updateState = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            input : req.body.newState,
            error: "invalid state, available options: 'finished', 'active', 'makingBets' "
        })
    }
    try {
        const game = await Game.findOne().sort({ 'created_at': -1 })
        if (!game) {
            return res.status(500).json({
                error: 'no game found'
            })
        }
        game.state = req.body.newState
        game.save()
        res.sendStatus(204)
    } catch (error) {
        throw new HttpError(error)
    }
}