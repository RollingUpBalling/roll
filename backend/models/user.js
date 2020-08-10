const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    _id:{
        type: String,
        required:true   
    },
    steamUsername:{
        type: String,
        required: true,   
    },
    balance:{
        type: Number,
        required: true,
        default: 1
    },
    avatar: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User',User)