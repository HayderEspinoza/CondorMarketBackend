'use strict'

const Category = require('../models/Category')
const { validationResult } = require('express-validator/check')
const { messages } = require('../app/constants')

function index(req, res) {
    Category.find({})
    .populate('products')
    .then(categories => {
        return res.status(200).send({ categories })
    }).catch(error => {
        return res.status(500).send({ msg: error })
    })   
}

function show(req, res) {
    Category.findById(req.params.id).then(category => {
        return res.status(200).send(category._doc)
    }).catch(error => {
        return res.status(500).send({ msg: messages.error.server, error })
    })
}

function store(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(409).send({ errors: errors.mapped() })
    else {
        const category = new Category(req.body);
        category.save((error, categoryStored) => {
            if (error) return res.status(500).send({ message: messages.error.server, error })
            return res.status(201).send({ message: messages.store, category: categoryStored })
        })
    }
}

function update(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(409).send({ errors: errors.mapped() })
    else {
        Category.findByIdAndUpdate(req.params.id, res.body).then((category) => {
            if (category) return res.status(200).send({ 'message': messages.update, category });
            return res.status(404).send({ 'message': messages.error.notFound, error })
        }).catch(error => {
            return res.status(500).send({ 'message': messages.error.server, error })
        })
    }
}

function remove(req, res) {
    Category.findByIdAndRemove(req.params.id).then((result) => {
        if (result) return res.status(200).send({ 'message': messages.remove })
        return res.status(404).send({ 'message': messages.error.notFound, error })
    }).catch(error => {
        return res.status(500).send({ 'message': messages.error.server, error })
    })
}

module.exports = {
    index, show, store, update, remove
}