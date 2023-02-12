const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    point: {
        type: Number,
        min: 1,
        max: 5,
    },
    message: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

}, {
    timestamps: true
})

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    color: String,
    description: {
        type: String
    },
    price: Number,
    size: String,
    offers: [String], // multiple offers, arrays of string
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    discount: {
        discountedItem: Boolean,
        discountType: {
            type: String,
            enum: ['percentage', 'quantity', 'value']
        },
        discountValue: String,
    },
    warrentyStatus: Boolean,
    warrentyPeriod: String,
    reviews: [reviewSchema], // arrays of object
    tags: [String], // arrays of string
    images: [String],
    modelNo: String


}, {
    timestamps: true
})

module.exports = mongoose.model('product', ProductSchema)