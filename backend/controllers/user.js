const jwt = require("jsonwebtoken");
const HttpError = require('../models/HttpError');
const User = require('../models/user')




exports.SignIn = async (req, res, next) => {
    try {
        let user = await User.findById(req.user.id)
        if(!user) {
            user = await User.create({
                _id:req.user.id,
                steamUsername:req.user.displayName,
                avatar: req.user.photos[2].value
            })
        }
        else {
            user.avatar = req.user.photos[2].value
            user.steamUsername = req.user.displayName
            user = await user.save()
        }
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
    } catch (error) {
        return next( new HttpError(error));
    }
}

exports.GetUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return next(new HttpError('User not found',400))
        }
        return res.status(200).json(user)
    }
    catch (e) {
        return next(new HttpError(e))
    }
    
}