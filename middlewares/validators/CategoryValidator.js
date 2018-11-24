'use strict'

const { checkSchema } = require('express-validator/check');
const User = require('../../models/User');

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
};