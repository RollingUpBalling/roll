const Game = require('../models/game')
const HttpError = require('../models/HttpError')


exports.createGame = async (req, res, next) => {
    try {
        const lastGame = await Game.findOne().sort({ _id: -1 })
        if (lastGame && lastGame.state !== 'finished') {
            return next(new HttpError('last game is not finished yet',500))
        }
        const game = await Game.create({
            koef: 1 //should be defined by some algoritm later 
        })
        const io = require('../socket').getIO()
        io.emit('recieveId',{
            'gameId' : game._id
        });
        io.emit('newPhase',{
            state:'makingBets'
        })
        setInterval(function () {
            if (game.timerStart <= 0) return;
            game.timerStart = game.timerStart-10;
            io.emit('timerStart', { 'numbers': game.timerStart });
        }, 10)
        setTimeout(() => {
            console.log('first timeout')
            game.state = 'active'
            game.save()
            io.emit('newPhase',{
                state:'active'
            })
            let interval2 = setInterval(function () {
                if (game.timerFinish >= game.koef*1000) return ;
                game.timerFinish = game.timerFinish+10;

                io.emit('timerFinish', { 'koef': game.timerFinish });
            }, 100)
           
            setTimeout(() => {
                console.log('second timeout')
                game.state = 'finished'
                game.save()
                clearInterval(interval2);
                io.emit('newPhase',{
                    state:'finished',
                    timer: 30000
                })
                

            }, game.koef*10000);
        }, 30000);
        return res.status(201).json({'gameId' : game._id})

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}



