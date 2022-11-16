const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter a Product Name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please Enter a Description']
    },
    price: {
        type: Number,
        required: [true, 'Please Enter a Price'],
        maxLength: [8, 'Price cannot exceed 8 characters']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please Enter a Product Category']
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter Number of available Product Stocks'],
        maxLength: [4, 'Stock cannot exceed more than 4 character'],
        default: 1
    },
    numOfreview: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Product = mongoose.model('Product', productSchema)

module.exports = Product   