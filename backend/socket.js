const Game = require('./models/game')

let io;

module.exports={
    init: (httpServer) => {
        io = require('socket.io')(httpServer);
        io.on('connection', (socket) => {
            Game.findOne().sort({_id:-1}).populate('bets')
            .then(game=>{
                if(!game){
                    console.log('Client Conneted');
                }
                else if(game.state === 'makingBets'){
                    socket.emit('recieveId', {
                        'gameId':game._id
                    });
                    socket.emit('timer', {'numbers': game.timerStart})
                    socket.emit('getBets',{
                        'bets':game.bets,
                        'gameAmount': game.amount,
                        'users':game.bets.length
                    });
                    
                    console.log('Client Conneted');
                }
                
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