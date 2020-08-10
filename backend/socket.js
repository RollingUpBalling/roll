const Game = require('./models/game')
let io;

module.exports={
    init: (httpServer) => {
        io = require('socket.io')(httpServer);
        
        io.on('connection', (socket) => {
            socket.on('betWon',data => {
                
                socket.broadcast.emit('changeBetWonState',{
                    bet:data.bet
                })
            })

            
            Game.findOne().sort({_id:-1}).populate('bets')
            .then(game=>{
                if(game.state === 'makingBets'){
                    socket.emit('recieveId', {
                        'gameId':game._id
                    });
                    socket.emit('timer', {'numbers': game.timerStart})
                    socket.emit('getBets',{
                        'bets':game.bets,
                        'gameAmount': game.amount,
                        'users':game.bets.length
                    });
                    
                    
                }
                
            })
           
            Game.find({},{koef: 1, _id: 0 }).sort({ $natural: -1 }).limit(10)
            .then(koefs=>{
                socket.emit('koefs',{koefs:koefs});
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