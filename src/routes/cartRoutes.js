const express = require("express");
const { addToCart, getCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate.middleware");
const { addToCartValidation } = require("../validators/cart.validator");

const router = express.Router();

router.post("/add", addToCartValidation, validate, protect, addToCart);

router.get("/", protect, getCart);

module.exports = router;