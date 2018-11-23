'use strict'

const mongosee = require('mongoose')
const Schema = mongosee.Schema

const ProductSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category_id: { type: Schema.Types.ObjectId, required: true, ref: 'Category', trim: true },
    image: { type: String, required: true, trim: true },
    price: { type: Number, default: 0 },
}, 
{
    timestamps: { createdAt: 'created_at', updateAt: 'updated_at' }
})

module.exports = mongosee.model('Category', CategorySchema)