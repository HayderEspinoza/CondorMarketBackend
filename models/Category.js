'use strict'

const mongosee = require('mongoose')
const Schema = mongosee.Schema

const CategorySchema = new Schema({
    name: { type: String, trim: true },    
    description: { type: String, trim: true },
},
{
    timestamps: { createdAt: 'created_at', updateAt: 'updated_at' }
})

module.exports = mongosee.model('Category', CategorySchema)