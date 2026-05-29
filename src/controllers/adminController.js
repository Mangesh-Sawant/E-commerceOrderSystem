const User = require("../models/User");
const Order = require("../models/Order");
const ORDER_STATUS = require("../constants/orderStatus");

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


module.exports = {
    getAllUsers,
    deleteUser,
    getAllOrders,
    updateOrderStatus
};
