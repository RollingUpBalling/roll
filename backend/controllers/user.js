const jwt = require("jsonwebtoken");
//const User = require('../models/user')

exports.SignIn = (req, res, next) => {
    //search for user in db or create new one
    // add balance param to token
    const token = jwt.sign({ _id: req.user.id, username: req.user.displayName  }, 'secret', {
        expiresIn: "2h",
      });
      res.render("success", {
        jwtToken: token,
        clientUrl: 'http://localhost:3000/',
      });
}