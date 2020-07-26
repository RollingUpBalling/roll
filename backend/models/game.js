const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
    _id:{
        type: String,
        required:true   
    },
    koef:{
        type: Number,               // we generate it from the start
        required: true
    },
    amount:{
        type: Number,
        required: true,
    },
    bets:[{                                     // array of bets
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Bet"
    }]
})

module.exports = mongoose.model('Game',Game);