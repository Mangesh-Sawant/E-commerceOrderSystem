// ─── ADMIN SEED SCRIPT ──────────────────────────────────────────
// Run this ONCE to create the first admin account:
// node src/scripts/createAdmin.js

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const connectDB = require("../config/db");

const createAdmin = async () => {
    await connectDB();

    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
        console.log("Admin already exists!");
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
        name: "Super Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin"
    });

    console.log("✅ Admin created successfully!");
    console.log("   Email:    admin@example.com");
    console.log("   Password: Admin@123");
    console.log("   (Change the password after first login)");

    process.exit(0);
};

createAdmin();
