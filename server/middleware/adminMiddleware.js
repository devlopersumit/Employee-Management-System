const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = async (req, res, next) => {

    const token = req.cookies?.token || null;

    if (!token) {
        return res.status(401).json({ success: false, message: "Authentication token required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "EMS@2025");
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.role !== "ADMIN") {
            return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

module.exports = adminAuth;