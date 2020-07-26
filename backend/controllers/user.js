const jwt = require("jsonwebtoken");
const User = require('../models/user')

exports.SignIn = (req, res, next) => {
    let balance = 1
    User.findById(req.user.id)
    .then(user => {
        if(user) {
            balance = user.balance
            return balance
        }
        else{
            return User.create({
                _id:req.user.id,
                steamUsername:req.user.displayName
            })
        }
    })
    .then(data => {
        console.log(data)
        const token = jwt.sign({ _id: req.user.id, username: req.user.displayName}, 'secret', {
            expiresIn: "2h",
          });
          res.render("success", {
            id: req.user.id,
            username: req.user.displayName,
            jwtToken: token,
            clientUrl: 'http://localhost:3000/',
          });
    })
    .catch((e) => {
        console.log("fdfsdf")
        console.log(e)
    })

}