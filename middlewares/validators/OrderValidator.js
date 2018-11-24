'use strict'

const { checkSchema } = require('express-validator/check');
const Order = require('../../models/Order');

const storeValidation = {
    user: {
        isEmpty: {
            errorMessage: 'User is required',
            negated: true,
        },
    },
    products: {
        isEmpty: {
            errorMessage: 'Product is required',
            negated: true,
        },
        isArray: {
            errorMessage: 'Must be add some products.',
        },
    },
    'products.*.product': {
        isEmpty: {
            errorMessage: 'Product is required',
            negated: true,
        },
    }
}


module.exports = {
    store: checkSchema(storeValidation),
    update: checkSchema(storeValidation),
};