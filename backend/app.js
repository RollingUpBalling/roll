const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const SteamStrategy = require('passport-steam').Strategy
const app = express()
const User = require('./models/user')
const userRoutes = require('./routes/user')

app.use(passport.initialize());
app.use(userRoutes)
app.set("view engine", "ejs");
app.set("views", "views");

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:5000/auth/return/',
    realm: 'http://localhost:5000/',
    apiKey: '80B0922FC7EC882935094C335322E1DA'
},
    (identifier, profile, done) => {
        return done(null, profile);
    }
));


mongoose.connect('mongodb+srv://admin:admin@cluster0.mszqc.mongodb.net/crash?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000)
    }).catch(err => console.log(err))