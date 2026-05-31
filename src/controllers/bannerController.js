const Banner = require("../models/Banner");

// ─── GET ACTIVE BANNERS (Public) ─────────────────────────────────
const getActiveBanners = async (req, res) => {
    try {
        const banners = await Banner.find({ isActive: true });
        return res.status(200).json(banners);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ─── GET ALL BANNERS (Admin Only) ─────────────────────────────────
const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });
        return res.status(200).json(banners);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ─── CREATE BANNER (Admin Only) ─────────────────────────────────
const createBanner = async (req, res) => {
    try {
        const { title, subtitle, imageUrl, isActive, link, backgroundColor } = req.body;
        
        const banner = await Banner.create({ 
            title, 
            subtitle, 
            imageUrl, 
            isActive, 
            link, 
            backgroundColor 
        });
        
        return res.status(201).json(banner);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ─── UPDATE BANNER (Admin Only) ─────────────────────────────────
const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const banner = await Banner.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }
        
        return res.status(200).json(banner);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ─── DELETE BANNER (Admin Only) ─────────────────────────────────
const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findByIdAndDelete(id);
        
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }
        
        return res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getActiveBanners, getAllBanners, createBanner, updateBanner, deleteBanner };
