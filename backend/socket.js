const Game = require('./models/game')
let io;
const wm = new WeakMap();

// func for emiting bet info 
const emitBetData = (socket,game) => {
    socket.emit('recieveGameInfo', {
        gameId:game._id,
        state:game.state
    });
    socket.emit('getBets',{
        bets:game.bets,
        gameAmount: game.amount,
        users:game.bets.length
    });
}

module.exports={
    init: (httpServer) => {
        io = require('socket.io')(httpServer, { perMessageDeflate: false });
        
        io.on('connection', (socket) => {

            // getting last game and all users in game
            Game.findOne().sort({_id:-1}).populate({
                path:'bets',
                populate:{path:'user'}
            })
            .then(game=>{
                // if we making bets we emitting timer 
                if(game.state === 'makingBets'){
                    emitBetData(socket,game)
                    socket.emit('timer', {'numbers': game.timerStart})    
                }
                // if game is on crash we getting bet info and emitting finish timer
                if (game.state === 'active') {
                    emitBetData(socket,game)
                    socket.emit('timerFinish', {'numbers': game.timerFinish})
                }            
            })
           // taking koef last 10 games and emiting it in connection
            Game.find({},{koef: 1, _id: 0 }).sort({ $natural: -1 }).limit(10).skip(1)   
            .then(koefs=>{
                socket.emit('koefs',{koefs:koefs});
            })

            // listeting eevent if bet is won and emiting to everyone that it has been won
            socket.on('betWon',data => {
                
                socket.broadcast.emit('changeBet',{
                    bet:data.bet
                })
            })
            
        })
        return io;
    },
    getIO: ()=>{
        if(!io){
            throw new Error("Socket IO wasnt initialized");
        }
        return io;
    }
}