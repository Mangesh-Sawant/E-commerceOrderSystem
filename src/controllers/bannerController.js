const Banner = require("../models/Banner");

// ─── GET ACTIVE BANNER (Public) ─────────────────────────────────
const getActiveBanner = async (req, res) => {
    try {
        // We only expect one banner document in the DB
        let banner = await Banner.findOne();
        
        // If no banner exists or it's inactive, return a safe default
        if (!banner || !banner.isActive) {
            return res.status(200).json({ isActive: false, message: "" });
        }

        return res.status(200).json(banner);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ─── UPDATE BANNER (Admin Only) ─────────────────────────────────
const updateBanner = async (req, res) => {
    try {
        const { message, isActive, link, backgroundColor } = req.body;
        
        // Find existing banner or create one if it doesn't exist
        let banner = await Banner.findOne();
        
        if (banner) {
            banner.message = message !== undefined ? message : banner.message;
            banner.isActive = isActive !== undefined ? isActive : banner.isActive;
            banner.link = link !== undefined ? link : banner.link;
            banner.backgroundColor = backgroundColor !== undefined ? backgroundColor : banner.backgroundColor;
            await banner.save();
        } else {
            banner = await Banner.create({ message, isActive, link, backgroundColor });
        }
        
        return res.status(200).json({
            message: "Banner updated successfully",
            banner
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getActiveBanner, updateBanner };
