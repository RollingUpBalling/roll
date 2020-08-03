const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bet = new Schema({
    user:{
        type: String,
        required: true,
        ref: "User"  
    },
    koef:{
        type: Number,
        required: true
    },
    retrieveKoef:{
        type:Number
    },
    won:{
        type:Boolean,               // dunno are we really need this
    },
    amount:{
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Bet',Bet);