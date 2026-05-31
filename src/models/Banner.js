const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    link: { type: String, default: "" }, // Optional link (e.g., "/category/electronics")
    backgroundColor: { type: String, default: "#012d1d" } // For the UI to know what color to render
}, { timestamps: true });

module.exports = mongoose.model("Banner", bannerSchema);
