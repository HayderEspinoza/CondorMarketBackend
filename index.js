'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./app/config')

mongoose.connect(config.DB, { useNewUrlParser: true }, (error, res) => {
    if (error) {
        console.log(`--> Error mongo connection`);
        throw error
    }
    app.listen(config.PORT, () => {
        console.log('--> server is running in the port ' + config.PORT)
    })
})
