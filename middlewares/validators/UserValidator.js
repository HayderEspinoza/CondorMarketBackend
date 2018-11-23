'use strict'

const { checkSchema } = require('express-validator/check');
const User = require('../../models/User');

const registerValidations = {
    email: {
        isEmpty: {
            errorMessage: 'Field is required',
            negated: true,
        },
        isEmail: true,
        custom: {
            errorMessage: 'Email not available',
            options: (email, { req, location, path }) => {
                return User.findOne({email}).then(user => {
                    if (user) {
                        return Promise.reject();
                    }
                });
            }
        },
    },
    password: {
        isLength: {
            errorMessage: 'The password must be at least 5 characters.',
            options: { min: 5 }
        }
    },
    name: {
        isEmpty: {
            errorMessage: 'Field is required',
            negated: true,
        },
    },
    lastname: {
        isEmpty: {
            errorMessage: 'Field is required',
            negated: true,
        },
    },
}

const loginValidations = {
    email: {
        isEmpty: {
            errorMessage: 'Field is required',
            negated: true,
        },
        isEmail: true,
        custom: {
            errorMessage: 'Email does not found',
            options: (email, { req, location, path }) => {
                return User.findOne({ email }).then(user => {
                    if (!user) return Promise.reject();
                });
            }
        },
    },
    password: {
        isEmpty: {
            errorMessage: 'Field is required',
            negated: true,
        },
    },
}

module.exports = {
    register: checkSchema(registerValidations),
    login: checkSchema(loginValidations),
};