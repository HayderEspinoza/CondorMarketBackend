'use strict'

const mongosee = require('mongoose')
const Schema = mongosee.Schema
const config = require('../app/config')

const ProductSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category', trim: true },
    image: { type: String, trim: true },
    price: { type: Number, default: 0 },
}, 
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },

})

ProductSchema.virtual('fullImage').get(function () {
    return config.HOST + this.image;
});

module.exports = mongosee.model('Product', ProductSchema)