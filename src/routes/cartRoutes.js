const express = require("express");
const { addToCart, getCart, removeFromCart, updateCartItem, clearCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate.middleware");
const { addToCartValidation, updateCartValidation } = require("../validators/cart.validator");

const router = express.Router();

router.post("/add", addToCartValidation, validate, protect, addToCart);

router.get("/", protect, getCart);

router.delete("/:productId", protect, removeFromCart);

router.put("/:productId", updateCartValidation, validate, protect, updateCartItem);

router.delete("/", protect, clearCart);

module.exports = router;