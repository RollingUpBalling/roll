const HttpError = require('../models/HttpError');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    if(req.method === "OPTIONS"){
        return next();
    }
    let token;
    try {
        token = req.headers.authorization.split(' ')[1]; //Authorization bearer token
        if (!token) {
            next(new HttpError('Login to continue',403))
        }
        const decodedToken = jwt.verify(token, 'secret');
        
        req.userData = { userId: decodedToken._id };
        next();
    }
    catch (err) {
        next(new HttpError('invalid token',403))
    }
}

module.exports = auth
