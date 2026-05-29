const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    message: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    link: { type: String, default: "" }, // Optional link (e.g., "/category/electronics")
    backgroundColor: { type: String, default: "#4F46E5" } // For the UI to know what color to render
}, { timestamps: true });

module.exports = mongoose.model("Banner", bannerSchema);
