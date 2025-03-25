const User = require("../models/User");
const mongoose = require("mongoose");

// Get User Profile
module.exports.getUserProfile = async (req, res) => {
    try {
        console.log("✅ Decoded User ID from Token:", req.user?.userId);  

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized - No User ID Found" });
        }

        // ✅ Convert String ID to MongoDB ObjectId
        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            console.log("❌ No user found in DB for ID:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("🚨 Error in Profile Route:", error);
        res.status(500).json({ message: "Server error" });
    }
};

