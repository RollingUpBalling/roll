const Game = require('../models/game')
const HttpError = require('../models/HttpError')

exports.updateState = async (req,res,next) => {
    try {
        const game = await Game.findOne().sort({'created_at':-1})
        if (req.body.newState === 'active' || req.body.newState === 'makingBets' || req.body.newState === 'finished') {
            game.state = req.body.newState
            game.save()
            res.sendStatus(204)
        }
        else {
            res.status(400).json({
                error:'invalid state'
            })
        }
    } catch (error) {
        throw new HttpError(error)
    }
}