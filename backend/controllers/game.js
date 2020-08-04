const Game = require('../models/game')
const HttpError = require('../models/HttpError')
const bet = require('../models/bet')


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
            io.on('betWon',data => {
                console.log(data)
            })
            let interval2 = setInterval(async function () {
                if (game.timerFinish >= game.koef*1000) return ;
                game.timerFinish = game.timerFinish+10;
                io.emit('timerFinish', { 'koef': game.timerFinish });
            }, 100)
           
            setTimeout(async () => {
                clearInterval(interval2);
                console.log('second timeout')
                game.state = 'finished'
                await game.save()
                const currentGame = await Game.findOne().sort({ _id: -1 }).populate({
                    path:'bets',
                    populate:{
                        path:'user',
                        model:'User'
                    }
                })
                currentGame.bets.forEach(async bet => {
                    if (!bet.won) {
                        if (bet.koef <= currentGame.koef) {
                            bet.won = true
                            bet.user.balance += bet.amount * bet.koef
                            await bet.save()
                            await bet.user.save()
                        }
                        else {
                            bet.won = false
                            bet.user.balance -= bet.amount
                            await bet.user.save()
                            await bet.save()
                        }
                    }
                });
                await currentGame.save()
                console.log(currentGame)
                console.log(currentGame.bets[0].user)
                
                io.emit('newPhase',{
                    state: 'crashed'
                })  
                io.emit('gameResults',{
                    bets:currentGame.bets
                })
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



