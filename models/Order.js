'use strict'

const mongosee = require('mongoose')
const Schema = mongosee.Schema

const OrderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', trim: true },
    products: [
        {
            product_id: { type: Schema.Types.ObjectId, ref: 'Product'},
            quantity: { type: Number, default: 1 },
        }
    ],
},
{ 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongosee.model('Order', OrderSchema)