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
            const err = new Error('Login to continue')
            err.statusCode = 403
            throw err
        }
        const decodedToken = jwt.verify(token, 'secret');
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (err) {
        err.statusCode = 403
        next(err)
    }
}

module.exports = auth
