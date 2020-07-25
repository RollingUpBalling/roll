const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use('/',(req,res,next) => {
    console.log('Kekw')
    next()
})

mongoose.connect('mongodb+srv://admin:admin@cluster0.mszqc.mongodb.net/crash?retryWrites=true&w=majority')
.then(() => {
    app.listen(5000)
}).catch(err => console.log(err))