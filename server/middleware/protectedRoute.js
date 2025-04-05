
const User = require('../models/user.model');

const protectRoute = async (req, res, next) => {
    try {
        const {ownerId} = req.body;
        const user = await User.findById(ownerId)
        if(!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if(user.role !== 'owner'){
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = user; // Attach the user to the request object for later use
        next();
        
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(500).json({ error: "Internal server error" });
        
    }
};


module.exports = { protectRoute };