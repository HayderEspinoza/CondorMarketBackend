'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../app/config')

function createToken(user, time = 14, format = 'days') {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(time, format).unix()
    }
    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 403,
                    message: 'Token has expired'
                })
            }
            resolve(payload.sub)
        } catch (err) {
            reject({
                status: 403,
                message: 'Token has expired'
            })
        }
    })
    return decoded
}

module.exports = {
    createToken,
    decodeToken,
}