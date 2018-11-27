'use strict'

const Order = require('../models/Order')
const { validationResult } = require('express-validator/check')
const { messages } = require('../app/constants')

function index(req, res) {
    Order.find({ user: { $eq: req.user }})
        .populate('user')
        .populate({ path: "products.product" })
        .then(orders => {
            return res.status(200).send({ data: orders })
        }).catch(error => {
            return res.status(500).send({ msg: error })
        })
}

function show(req, res) {
    Order.findById(req.params.id)
    .populate('user')
    .populate({ path: "products.product" })
    .then(order => {
        return res.status(200).send(order._doc)
    }).catch(error => {
        return res.status(500).send({ msg: messages.error.server, error })
    })
}

function store(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(409).send({ errors: errors.mapped() })
    else {
        const order = new Order(req.body);
        order.save((error, orderStored) => {
            if (error) return res.status(500).send({ message: messages.error.server, error })
            return res.status(201).send({ message: messages.store, order: orderStored })
        })
    }
}

function update(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(409).send({ errors: errors.mapped() })
    else {
        Order.findById(req.params.id).then(storedOrder => {
            storedOrder.products = req.body.products
            storedOrder.save().then((updatedOrder) => {
                if (updatedOrder) return res.status(200).send({ 'message': messages.update, order: updatedOrder });
                return res.status(404).send({ 'message': messages.error.notFound, error })
            })
        }).catch(error => {
            return res.status(500).send({ 'message': messages.error.server, error })
        })
    }
}

function remove(req, res) {
    Order.findByIdAndRemove(req.params.id).then((result) => {
        if (result) return res.status(200).send({ 'message': messages.remove })
        return res.status(404).send({ 'message': messages.error.notFound, error })
    }).catch(error => {
        return res.status(500).send({ 'message': messages.error.server, error })
    })
}

module.exports = {
    index, show, store, update, remove
}