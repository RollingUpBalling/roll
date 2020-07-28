const Bet = require('../models/bet')
const Game = require('../models/game')


exports.makeBet = async (req, res, next) => {
    try {
        let game = await Game.findOne({ state: 'active' })
        if (!game) {
            game = await Game.create({
                koef: 2.28 //should be defined by some algoritm later 
            })
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
            bet:bet
        })
    } catch (error) {
        throw new Error(error)
    }

}