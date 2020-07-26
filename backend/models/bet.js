const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bet = new Schema({
    _id:{
        type: String,
        required:true   
    },
    steamUsername:{
        type: String,
        required: true,   
    },
    koef:{
        type: Number,
        required: true
    },
    result:{
        type:Boolean,               // dunno are we really need this
    },
    amount:{
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Bet',Bet);