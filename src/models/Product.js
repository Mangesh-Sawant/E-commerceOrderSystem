const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        default: "general"  // e.g. electronics, clothing, books
    },
    stock: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        default: [],
        validate: {
            validator: function(array) {
                return array.length <= 5;
            },
            message: "A product can have at most 5 images."
        }
    },
    productType: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);