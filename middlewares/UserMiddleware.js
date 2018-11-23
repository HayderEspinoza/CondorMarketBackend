'use strict'

const UserService = require('../services/UserService');
const User = require('../models/User');
const helpers = require('../app/helpers');

function isAuth(req, res, next) {
    if (!req.headers.authorization)
        return helpers.notAuthorized()
    const token = req.headers.authorization.split(' ')[1]
    UserService.decodeToken(token)
        .then(response => {
            req.user = response;
            User.findById(response).then((user) => {
                if(user) next();
                else helpers.notAuthorized(res);
            })
        }).catch(response => {
            res.status(response.status);
        })
}

function isAdmin(req, res, next) {
    User.findById(req.user).then((user) => {
        if (user.role == 'admin') next();
        else helpers.notAuthorized(res);
    })
}

module.exports = {
    isAuth, isAdmin, isSuperAdmin
}