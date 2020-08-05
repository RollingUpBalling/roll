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
            'gameId' : game._id         //recieving game id
        });
        io.emit('newPhase',{
            state:'makingBets'              // adding ability to add bets
        })
        const inter1 = setInterval(function () {
            if (game.timerStart <= 0) return;           // interval for the timer of the start game
            game.timerStart = game.timerStart-10;
            io.emit('timerStart', { 'numbers': game.timerStart });
        }, 10)
        setTimeout(() => {

            
            game.state = 'active'
            game.save()
            clearInterval(inter1);      //clearing interval
            
            io.emit('newPhase',{
                state:'active'              // staring our game
            })
            let interval2 = setInterval(async function () {     // starting timer of the game with game koef
                if (game.timerFinish >= game.koef*1000) return ;
                game.timerFinish = game.timerFinish+10;
                io.emit('timerFinish', { 'koef': game.timerFinish });
            }, 100)
           
            setTimeout(async () => {
                clearInterval(interval2);
                
                game.state = 'finished'     // setting game to finished
                await game.save()
                const currentGame = await Game.findOne().sort({ _id: -1 }).populate({
                    path:'bets',
                    populate:{
                        path:'user',
                        model:'User'
                    }           //finding bets and theirs users
                })
                currentGame.bets.forEach(async bet => {
                    if (!bet.won) {
                        if (bet.koef <= currentGame.koef) {
                            bet.won = true      //adding status
                            bet.user.balance += bet.amount * bet.koef // adding balance
                            await bet.save()
                            await bet.user.save()
                        }
                        else {
                            bet.won = false
                            await bet.save()        //adding status
                        }
                    }
                });
                await currentGame.save()        //saves changes of the game
               
                io.emit('newPhase',{
                    state: 'crashed'        //adding state crashed
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
        }, 3100);
        return res.status(201).json({'gameId' : game._id})

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}



