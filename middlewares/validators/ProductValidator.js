'use strict'

const { checkSchema } = require('express-validator/check');
const Category = require('../../models/Category');

const storeValidation = {
    name: {
        isEmpty: {
            errorMessage: 'Field is required',
            negated: true,
        },
    },
    category_id: {
        isEmpty: {
            errorMessage: 'Field is required',
            negated: true,
        },
        custom: {
            errorMessage: 'Category does not found',
            options: (category, { req, location, path }) => {
                return Category.findById(category).then(categoryStored => {
                    if (categoryStored) return Promise.resolve();
                    return Promise.reject();
                });
            }
        },
    },
}


module.exports = {
    store: checkSchema(storeValidation),
    update: checkSchema(storeValidation),
};