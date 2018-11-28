'use strict'

const Product = require('../models/Product')
const Category = require('../models/Category')
const { validationResult } = require('express-validator/check')
const { messages } = require('../app/constants')
const config = require('../app/config')

function index(req, res) {
    const { category, name } = req.query
    let query = {}
    //Filters
    if(category){
        if(Array.isArray(category))
            query.category = { $in: category }
        else
            query.category = { $in: [category] }
    }
    if(name)
        query.name = { '$regex': name, '$options': 'i' }
    //End filters
    Product.find(query)
        .populate('category')
        .then(products => {
            return res.status(200).send({ data: products })
        }).catch(error => {
            return res.status(500).send({ msg: error })
        })
}

function show(req, res) {
    Product.findOne({ _id: req.params.id }).then(product => {
        return res.status(200).send(product)
    }).catch(error => {
        return res.status(500).send({ msg: messages.error.server, error })
    })
}

function store(req, res) {
    // console.log('req', req);
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(409).send({ errors: errors.mapped() })
    else {
        // return res.status(409).send({ 'test': req.file })
        if(req.file){
            const product = new Product({ ...req.body, image: `${config.UPLOADS}/${req.file.filename}`});
            product.save((error, productStored) => {
                if (error) return res.status(500).send({ message: messages.error.server, error })
                return res.status(201).send({ message: messages.store, Product: productStored })
            })
        }
    }
}

function update(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(409).send({ errors: errors.mapped() })
    else {
        Product.findByIdAndUpdate(req.params.id, req.body).then((product) => {
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