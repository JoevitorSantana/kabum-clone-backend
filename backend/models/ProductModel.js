const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a name of a product'],
        trim: true,        
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
        maxLength:[4000, "Description is can not exceed tha 4000 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please add a price for your product"],
        maxlength: [8, "Price can not excedd more than 8 characters"],
    },
    discountPrice: {
        type: String,
        maxLength: [4, "Discount price can not exceed 4 characters"]
    },
    color: {
        type: String,
    },
    size: {
        type: String,
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }
    ],
    category: {
        type: String,
        required: [true, "Please add a category of your product"],
    },
    Stock: {
        type: Number,
        required: [true, "Please add some stoke for your product"],
        maxLength: [3, 'Stock can not exceed more than 3 characters']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    nVlPeso: {
        type: Number,
        default: 1
    },
    nVlComprimento: {
        type: Number,   
        default: 20,
    },
    nVlAltura:{
        type: Number,
        default: 20,
    },
    nVlLargura: {
        type: Number,
        default: 20
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
            },
            time: {
                type: Date,
                default: Date.now()
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        //required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", productSchema)