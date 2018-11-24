'use strict'

const express = require('express')
const api = express.Router()

//Controllers
const UserController = require('../controllers/UserController')
const CategoryController = require('../controllers/CategoryController')

//Validators
const UserValidator = require('../middlewares/validators/UserValidator')
const CategoryValidator = require('../middlewares/validators/CategoryValidator')

//Middleware
const UserMiddleware = require('../middlewares/UserMiddleware')

//User routes
api.post('/register', [UserValidator.register], UserController.register)
api.post('/login', [UserValidator.login], UserController.login)
api.get('/check-token', UserController.checkToken)

//Categories routes
api.get('/categories', CategoryController.index)
api.post('/categories', [UserMiddleware.isAuth, UserMiddleware.isAdmin, CategoryValidator.store], CategoryController.store)
api.get('/categories/:id', CategoryController.show)
api.put('/categories/:id', [UserMiddleware.isAuth, UserMiddleware.isAdmin, CategoryValidator.store], CategoryController.update)
api.delete('/categories/:id', [UserMiddleware.isAuth, UserMiddleware.isAdmin], CategoryController.remove)

module.exports = api
