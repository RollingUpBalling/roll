const Game = require('../models/game')
const HttpError = require('../models/HttpError')


exports.createGame = async (req, res, next) => {
    try {
        const lastGame = await Game.findOne().sort({ _id: -1 })
        if (lastGame && lastGame.state !== 'finished') {
            return next(new HttpError('last game is not finished yet',500))
        }
        const game = await Game.create({
            koef: 2 //should be defined by some algoritm later 
        })
        const io = require('../socket').getIO()
        io.emit('recieveId',{
            'gameId' : game._id
        });
        io.emit('newPhase',{
            state:'makingBets'
        })
        const inter1 = setInterval(function () {
            if (game.timerStart <= 0) return;
            game.timerStart = game.timerStart-10;
            io.emit('timerStart', { 'numbers': game.timerStart });
        }, 10)
        setTimeout(() => {

            console.log('first timeout')
            game.state = 'active'
            game.save()
            clearInterval(inter1);


            io.emit('newPhase',{
                state:'active'
            })
            let interval2 = setInterval(function () {
                if (game.timerFinish >= game.koef*1000) return ;
                game.timerFinish = game.timerFinish+10;

                io.emit('timerFinish', { 'koef': game.timerFinish });
            }, 100)
           
            setTimeout(() => {
                clearInterval(interval2);
                console.log('second timeout')
                game.state = 'finished'
                io.emit('newPhase',{
                    state: 'crashed'
                })
                game.save()
                
                
        
                setTimeout(()=>{
                    io.emit('newPhase',{
                        state:'finished'
                    })
                },2000)
            }, game.koef*10000 - 10000);
        }, 31000);
        return res.status(201).json({'gameId' : game._id})

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}



