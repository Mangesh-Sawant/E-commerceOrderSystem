const express = require("express");
const router = express.Router();

const { getAllUsers, deleteUser, getAllOrders, updateOrderStatus, createAdmin } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin.middleware");

// Every admin route runs: protect → isAdmin → controller
router.get("/users", protect, isAdmin, getAllUsers);
router.delete("/users/:id", protect, isAdmin, deleteUser);
router.post("/users/create-admin", protect, isAdmin, createAdmin);  // only admin can create another admin
router.get("/orders", protect, isAdmin, getAllOrders);
router.put("/orders/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;
