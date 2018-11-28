'use strict'

const User = require('../models/User');
const UserService = require('../services/UserService');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt-nodejs');
const config = require('../app/config');

function register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        res.status(409).send({ errors: errors.mapped() })
    else {
        const user = new User(req.body)
        user.save((error, userStored) => {
            if (error) res.status(500).send({ message: 'There was a problem creating the user', error: error })
            let token = UserService.createToken(user)
            return res.status(201).send({ token, role: user.role })
        });
    }
}

function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        res.status(409).send({ errors: errors.mapped() })
    else {
        User.findOne({ email: req.body.email }, (error, user) => {
            if (error) return res.status(500).send({ message: error });
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if (result)
                    return res.status(200).send({
                        message: `Welcome to ${config.APP_NAME}`,
                        token: UserService.createToken(user),
                        role: user.role,
                        user: user._id
                    })
                return res.status(409).send({
                    errors: { password: { msg: 'The password does not match' } },
                })
            });
        })
    }

}

function checkToken(req, res) {
    res.status(200).send({ message: 'Valid token', status: true })
}

module.exports = {
    register, login, checkToken
}