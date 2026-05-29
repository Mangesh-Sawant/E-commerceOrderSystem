const express = require("express");
const router = express.Router();

const { getAllUsers, deleteUser, getAllOrders, updateOrderStatus } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin.middleware");

// Every admin route runs: protect → isAdmin → controller
// protect: is user logged in?
// isAdmin: is the user an admin?

router.get("/users", protect, isAdmin, getAllUsers);
router.delete("/users/:id", protect, isAdmin, deleteUser);
router.get("/orders", protect, isAdmin, getAllOrders);
router.put("/orders/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;
