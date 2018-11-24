'use strict'

const { checkSchema } = require('express-validator/check');

const storeValidation = {
    name: {
        isEmpty: {
            errorMessage: 'Field is required',
            negated: true,
        },
    },
}

module.exports = {
    store: checkSchema(storeValidation),
    update: checkSchema(storeValidation),
};