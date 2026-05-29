const express = require("express");
const router = express.Router();

const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin.middleware");

// ── Public routes (anyone can browse products) ────────────────────
router.get("/", getProducts);
router.get("/:id", getProductById);

// ── Admin only routes (must be logged in + admin role) ────────────
router.post("/", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;