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
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);