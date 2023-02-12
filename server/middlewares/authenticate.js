const config = require('config')
const jwt = require('jsonwebtoken')
const UserModel = require('./../models/user.model')
module.exports = function (req, res, next) {

    let token;
    if (req.headers['authorization'])
        token = req.headers['authorization']
    if (req.headers['x-acess-token'])
        token = req.headers['x-acess-token']
    if (req.query.token) {
        token = req.query.token
    }
    if (token) {
        // token verification
        jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
            if (err) {
                return next(err)
            }
            // token verification complete
            // console.log('token verification complete', decoded)
            // req.user = decoded;
            UserModel.findById(decoded._id, function (err, user) {
                if (err) {
                    return next(err)
                }
                if (!user) {
                    return next({
                        msg: 'Authentication Failed, User Not Found',
                        status: 401
                    })
                }
                req.user = user;
                next();
            })
        })
    }
    else {
        next({
            msg: 'Authentication Failed, Token Not Provided',
            status: 400
        })
    }
}


// TODO create a authorize middleware
// check wheather the user is admin or not