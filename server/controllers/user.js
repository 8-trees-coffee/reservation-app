const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../model/user')


function notAutorized(res) {
    return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'You need to login!'}]})
}

exports.setMiddleware = function(req, res, next) {
    const token = req.headers.authorization

    if(!token) {
        return notAutorized(res)
    }

    jwt.verify(token.split(' ')[1], config.SECRET, function(err, decodedToken) {
        if(err) {
            return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'Invalid Token!'}]})
        }
        try {
            const foundUser = User.findById(decodedToken.userId)
            if(!foundUser) {
                return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'Invalid Token!'}]})
            }
            next()
        } catch(err) {
            return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'Invalid Token!'}]})
        }
    });
}