const express = require("express");
const router = express.Router();
const { getMyNotifications, markAllAsRead } = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

// All notification routes require login
router.get("/", protect, getMyNotifications);
router.put("/read", protect, markAllAsRead);

module.exports = router;
