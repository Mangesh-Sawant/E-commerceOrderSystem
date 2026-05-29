const ROLES = require("../constants/roles");

// ─── ADMIN MIDDLEWARE ───────────────────────────────────────────
// This runs AFTER protect middleware
// protect sets req.user → isAdmin checks if req.user.role is "admin"
// If not admin → block with 403 Forbidden
const isAdmin = (req, res, next) => {
    if (req.user.role !== ROLES.ADMIN) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next(); // role is admin → move to controller
};

module.exports = { isAdmin };
