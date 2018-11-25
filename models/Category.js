'use strict'

const mongosee = require('mongoose')
const Schema = mongosee.Schema

const CategorySchema = new Schema({
    name: { type: String, trim: true },    
    description: { type: String, default: '', trim: true },
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true }
})

CategorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
});

module.exports = mongosee.model('Category', CategorySchema)