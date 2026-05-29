const Notification = require("../models/Notification");

// ─── GET MY NOTIFICATIONS ───────────────────────────────────────
// Get the latest 20 notifications for the logged-in user
const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(20);

        // Also return a count of how many are unread (for the red dot on the bell icon)
        const unreadCount = await Notification.countDocuments({ userId: req.user.id, isRead: false });

        return res.status(200).json({
            unreadCount,
            notifications
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// ─── MARK ALL AS READ ───────────────────────────────────────────
// When the user clicks the Bell icon, we mark all unread as read
const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { userId: req.user.id, isRead: false },
            { $set: { isRead: true } }
        );

        return res.status(200).json({ message: "Notifications marked as read" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getMyNotifications, markAllAsRead };
