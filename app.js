'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./app/routes')
const app = express()
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    origin: [
        "http://localhost:5000",
    ]
}));
app.use('/api', api)
api.use(function (req, res) {
    res.status(404).json({
        message: "URL doesn't exist (404)",
    });
});
module.exports = app