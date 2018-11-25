'use strict'

const Product = require('../models/Product')
const { validationResult } = require('express-validator/check')
const { messages } = require('../app/constants')

function index(req, res) {
    Product.find({}).then(products => {
        return res.status(200).send({ data: products })
    }).catch(error => {
        return res.status(500).send({ msg: error })
    })
}

function show(req, res) {
    Product.findById(req.params.id).then(product => {
        return res.status(200).send(product._doc)
    }).catch(error => {
        return res.status(500).send({ msg: messages.error.server, error })
    })
}

function store(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(409).send({ errors: errors.mapped() })
    else {
        const product = new Product(req.body);
        product.save((error, productStored) => {
            if (error) return res.status(500).send({ message: messages.error.server, error })
            return res.status(201).send({ message: messages.store, Product: productStored })
        })
    }
}

function update(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(409).send({ errors: errors.mapped() })
    else {
        Product.findByIdAndUpdate(req.params.id, res.body).then((product) => {
            if (product) return res.status(200).send({ 'message': messages.update, product });
            return res.status(404).send({ 'message': messages.error.notFound, error })
        }).catch(error => {
            return res.status(500).send({ 'message': messages.error.server, error })
        })
    }
}

function remove(req, res) {
    Product.findByIdAndRemove(req.params.id).then((result) => {
        if (result) return res.status(200).send({ 'message': messages.remove })
        return res.status(404).send({ 'message': messages.error.notFound, error })
    }).catch(error => {
        return res.status(500).send({ 'message': messages.error.server, error })
    })
}

module.exports = {
    index, show, store, update, remove
}