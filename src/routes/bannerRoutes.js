const express = require("express");
const router = express.Router();

const { getActiveBanner, updateBanner } = require("../controllers/bannerController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin.middleware");

// Public: Frontend calls this to display the banner
router.get("/", getActiveBanner);

// Admin: Update banner settings
router.put("/", protect, isAdmin, updateBanner);

module.exports = router;
