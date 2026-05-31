const express = require("express");
const { submitContactMessage, getContactMessages } = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin.middleware");

const router = express.Router();

// Public route to submit a contact message
router.post("/", submitContactMessage);

// Protected route for admins to view all contact messages
router.get("/", protect, isAdmin, getContactMessages);

module.exports = router;
