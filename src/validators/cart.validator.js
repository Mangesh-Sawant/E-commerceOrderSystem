const { body } = require("express-validator");

// Validation rules for adding to cart
const addToCartValidation = [
    body("productId")
        .notEmpty().withMessage("productId is required")
        .isMongoId().withMessage("productId must be a valid MongoDB ID"),

    body("quantity")
        .notEmpty().withMessage("quantity is required")
        .isInt({ min: 1 }).withMessage("quantity must be a positive integer")
];

// Validation rules for updating cart item quantity
const updateCartValidation = [
    body("quantity")
        .notEmpty().withMessage("quantity is required")
        .isInt({ min: 1 }).withMessage("quantity must be a positive integer")
];

module.exports = { addToCartValidation, updateCartValidation };