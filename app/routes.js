'use strict'

const express = require('express')
const api = express.Router()
const config = require('./config')

//Controllers
const UserController = require('../controllers/UserController')
const CategoryController = require('../controllers/CategoryController')
const ProductController = require('../controllers/ProductController')
const OrderController = require('../controllers/OrderController')

//Validations
const UserValidator = require('../middlewares/validators/UserValidator')
const CategoryValidator = require('../middlewares/validators/CategoryValidator')
const ProductValidator = require('../middlewares/validators/ProductValidator')
const OrderValidator = require('../middlewares/validators/OrderValidator')

//Authentication
const UserMiddleware = require('../middlewares/UserMiddleware')

//Middleware for handling multipart/form-data
const multer = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.UPLOADS)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let upload = multer({ storage: storage })

//Users routes
api.post('/register', [UserValidator.register], UserController.register)
api.post('/login', [UserValidator.login], UserController.login)
api.get('/check-token', UserController.checkToken)

//Categories routes
api.get('/categories', CategoryController.index)
api.post('/categories', [UserMiddleware.isAuth, CategoryValidator.store], CategoryController.store)
api.get('/categories/:id', CategoryController.show)
api.put('/categories/:id', [UserMiddleware.isAuth, CategoryValidator.update], CategoryController.update)
api.delete('/categories/:id', [UserMiddleware.isAuth], CategoryController.remove)

//Products routes
api.get('/products', ProductController.index)
api.post('/products', [UserMiddleware.isAuth, upload.single('image'), ProductValidator.store], ProductController.store)
api.get('/products/:id', ProductController.show)
api.put('/products/:id', [UserMiddleware.isAuth, ProductValidator.update], ProductController.update)
api.delete('/products/:id', [UserMiddleware.isAuth], ProductController.remove)

//Orders routes
api.get('/orders', [UserMiddleware.isAuth], OrderController.index)
api.post('/orders', [UserMiddleware.isAuth, OrderValidator.store], OrderController.store)
api.get('/orders/:id', OrderController.show)
api.put('/orders/:id', [UserMiddleware.isAuth, OrderValidator.update], OrderController.update)
api.delete('/orders/:id', [UserMiddleware.isAuth], OrderController.remove)

module.exports = api
