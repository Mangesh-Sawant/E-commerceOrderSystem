const express = require("express");

const { logIn, registerUser, forgotPassword, resetPassword, getProfile, updateProfile, changePassword } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ── Public routes (no login needed) ──────────────────────────────
router.post("/login", logIn);
router.post("/register", registerUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ── Protected routes (must be logged in) ─────────────────────────
// protect runs first → sets req.user → controller uses req.user.id
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;