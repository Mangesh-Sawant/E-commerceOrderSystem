const User = require("../models/User");
const Order = require("../models/Order");
const ORDER_STATUS = require("../constants/orderStatus");
const bcrypt = require("bcryptjs");
const ROLES = require("../constants/roles");

// ─── GET ALL USERS ──────────────────────────────────────────────
// Admin can see every registered user (without their passwords)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ─── DELETE A USER ──────────────────────────────────────────────
// Admin can delete any user by their ID
// Safety: prevent admin from deleting themselves
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent admin from deleting their own account
        if (id === req.user.id) {
            return res.status(400).json({ message: "You cannot delete your own account" });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ─── GET ALL ORDERS ─────────────────────────────────────────────
// Admin can see ALL orders from ALL users (not just their own)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("userId", "name email")     // show user name + email
            .populate("items.productId", "title price") // show product name + price
            .sort({ createdAt: -1 });

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ─── UPDATE ORDER STATUS ────────────────────────────────────────
// Admin can move order through the status pipeline:
// pending → confirmed → shipped → delivered
// OR cancel any order at any stage
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate the status value is one of the allowed values
        const allowedStatuses = Object.values(ORDER_STATUS);

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true } // return updated document
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({
            message: "Order status updated",
            order
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ─── CREATE ANOTHER ADMIN ───────────────────────────────────────
// Only an existing admin can create another admin account
// This avoids needing DB access or seed scripts every time
const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with admin role directly
        const newAdmin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: ROLES.ADMIN
        });

        return res.status(201).json({
            message: "Admin created successfully",
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                role: newAdmin.role
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



// ─── ADMIN STATS DASHBOARD ──────────────────────────────────────
// Returns key numbers for admin dashboard
// Uses MongoDB aggregation — powerful way to compute data in DB
const getStats = async (req, res) => {
    try {
        // Run all DB queries at the same time using Promise.all (faster than one by one)
        const [
            totalUsers,
            totalOrders,
            revenueResult,
            ordersByStatus
        ] = await Promise.all([

            // Count total registered users
            User.countDocuments(),

            // Count total orders
            Order.countDocuments(),

            // Sum up all totalAmount across all orders
            // $group: groups all documents into one
            // $sum: adds up the field
            Order.aggregate([
                { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
            ]),

            // Count orders grouped by status
            // e.g. { pending: 5, confirmed: 12, shipped: 3, ... }
            Order.aggregate([
                { $group: { _id: "$status", count: { $sum: 1 } } }
            ])
        ]);

        // revenueResult is an array — take first element, default to 0 if empty
        const totalRevenue = revenueResult[0]?.totalRevenue || 0;

        // Convert ordersByStatus array into a readable object
        // [ { _id: "pending", count: 5 } ] → { pending: 5 }
        const statusBreakdown = {};
        ordersByStatus.forEach(item => {
            statusBreakdown[item._id] = item.count;
        });

        return res.status(200).json({
            totalUsers,
            totalOrders,
            totalRevenue,
            ordersByStatus: statusBreakdown
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {

    getAllUsers,
    deleteUser,
    getAllOrders,
    updateOrderStatus,
    createAdmin,
    getStats
};
