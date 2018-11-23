'use strict'

const express = require('express')
const api = express.Router()

const UserController = require('../controllers/UserController')
const UserValidator = require('../middlewares/validators/UserValidator')
const UserMiddleware = require('../middlewares/UserMiddleware')

//User routes
api.post('/register', [UserValidator.register], UserController.register)
api.post('/login', [UserValidator.login], UserController.login)
api.get('/check-token', [UserMiddleware.isAuth], UserController.checkToken)



module.exports = api
