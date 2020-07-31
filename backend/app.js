const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const HttpError = require('./models/HttpError');
const Game = require('./models/game');
const userRoutes = require('./routes/user');
const betRoutes = require('./routes/bet')
const gameRoutes = require('./routes/game');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH, PUT');
    next();
});


app.use(passport.initialize());

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:5000/auth/return/',
    realm: 'http://localhost:5000/',
    apiKey: '80B0922FC7EC882935094C335322E1DA'
},
    (identifier, profile, done) => {
        return done(null, profile);
    }
));


app.use(userRoutes);
app.use(betRoutes)
app.use(gameRoutes)

app.use((req, res) => {
    const error = new HttpError('Couldnt find this route', 404);
    return res.json({ message: error.message });
})


// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
  });

mongoose.connect('mongodb+srv://admin:admin@cluster0.mszqc.mongodb.net/crash?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        const server = app.listen(5000);
        const io = require('./socket').init(server);
        io.on('connection', (socket) => {
            // io.emit('recieveId',{
            //     'gameId':gameId
            // });
            Game.findOne().sort({_id:-1})
            .then(game=>{
                if(!game){
                    console.log('Client Conneted');
                }
                else if(game.state === 'makingBets'){
                    socket.emit('recieveId', {
                        'gameId':game._id
                    })
                    console.log(game);
                    console.log('Client Conneted');
                }
                
            })
           
        })
    })
    .catch(err => console.log(err))