const Game = require('../models/game')
const HttpError = require('../models/HttpError')
const io = require('../socket');

exports.createGame = async (req, res, next) => {
    try {
        const lastGame = await Game.findOne().sort({ _id: -1 })
        if (lastGame && lastGame.state !== 'finished') {
            return next(new HttpError('last game is not finished yet',500))
        }
        const game = await Game.create({
            koef: 1 //should be defined by some algoritm later 
        })
        const socket = io.getIO()
        const id = io.getID()
        console.log(id)
        socket.emit('recieveId',{
            'gameId' : game._id
        });
        socket.emit('newPhase',{
            state:'makingBets'
        })
        setInterval(function () {
            if (game.timerStart <= 0) return;
            game.timerStart = game.timerStart-10;
            socket.emit('timerStart', { 'numbers': game.timerStart });
        }, 10)
        setTimeout(() => {
            console.log('first timeout')
            game.state = 'active'
            game.save()
            socket.emit('newPhase',{
                state:'active'
            })
            let interval2 = setInterval(function () {
                console.log(game.timerFinish)
                if (game.timerFinish >= game.koef*1000) return ;
                game.timerFinish = game.timerFinish+10;

                socket.emit('timerFinish', { 'koef': game.timerFinish });
            }, 100)
           
            setTimeout(() => {
                console.log('second timeout')
                game.state = 'finished'
                game.save()
                clearInterval(interval2);
                socket.emit('newPhase',{
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



