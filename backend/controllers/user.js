const jwt = require("jsonwebtoken");
const HttpError = require('../models/HttpError');
const User = require('../models/user')

exports.SignIn = (req, res, next) => {
    User.findById(req.user.id)
    .then(user => {
        if(!user) {
            return User.create({
                _id:req.user.id,
                steamUsername:req.user.displayName
            })
        }
        return user
    })
    .then(user => {
        const token = jwt.sign({ _id: user._id, username: user.steamUsername}, 'secret', {
            expiresIn: "2h",
          });
          res.render("success", {
            id: user._id,
            username: user.steamUsername,
            jwtToken: token,
            balance:'1',
            clientUrl:'http://localhost:3000'
          });
    })
    .catch((error) => {
        return next( new HttpError(error));
    })

}