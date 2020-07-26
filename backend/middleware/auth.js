const HttpError = require('../models/HttpError');
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {

    if(req.method === "OPTIONS"){
        return next();
    }
    let token;
    try {
        token = req.headers.authorization.split(' ')[1]; //Authorization bearer token
        if (!token) {
            return next(new HttpError('Authorization failed', 500))
        }
        const decodedToken = jwt.verify(token, 'secret');
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (err) {
        return next(new HttpError('Authorization failed', 500))
    }

}