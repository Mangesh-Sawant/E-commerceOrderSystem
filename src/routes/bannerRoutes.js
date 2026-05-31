const express = require("express");
const { getActiveBanners, getAllBanners, createBanner, updateBanner, deleteBanner } = require("../controllers/bannerController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin.middleware");

const router = express.Router();

// Public route: Get active banners for the frontend
router.get("/", getActiveBanners);

// Admin routes
router.get("/all", protect, isAdmin, getAllBanners);
router.post("/", protect, isAdmin, createBanner);
router.put("/:id", protect, isAdmin, updateBanner);
router.delete("/:id", protect, isAdmin, deleteBanner);

module.exports = router;
