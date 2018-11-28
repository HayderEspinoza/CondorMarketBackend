'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const api = require('./app/routes')
const app = express()
const cors = require('cors')
const User = require('./models/User')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static('./public'));
app.use(cors({
    credentials: true,
    origin: [
        "http://localhost:5000",
    ]
}));
// Add slug api to routes
app.use('/api', api)
app.use(function (req, res) {
    res.status(404).json({
        message: "URL doesn't exist (404)",
    });
});
//Create system user 
let users = [
    { name: 'Admin', email: 'admin@admin.com', password: 'admin' },
    { name: 'Test', email: 'test@test.com', password: 'admin' },
]
users.forEach(tmp => {
    User.findOne({ email: tmp.email }).then((user) => {
        if (!user) {
            let admin = new User(tmp)
            admin.save((error, stored) => {
                if(error) console.log('Error', error);
            })
        }
    }) 
});

module.exports = app