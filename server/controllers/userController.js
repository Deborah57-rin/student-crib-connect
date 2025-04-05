const User = require('../models/user.model');

exports.getAllUsers = async (req,res)=>{
    try {
        const users = await User.find({}).limit(10).sort({
            createdAt: -1
        });
        if(users.length > 0){
            res.status(200).json({users, success: true})
        }else{
            res.status(404).json({message:"No users found", success: false})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", success: false})
    }

}

exports.createUser = async (req,res)=>{
    try {
        const user = await User.create(req.body);
        res.status(201).json({user, success: true})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", success: false})
    }
}

exports.updateUser = async (req, res) => {
    try {
    const {id} = req.params;
     // Check if the user exists
     const user = await User.findById(id);
     if (!user) {
       return res.status(404).json({ success: false, message: "User not found" });
     }
 
 
     // If it's a regular field update, update the corresponding fields
     if (req.body) {
       for (const key in req.body) {
         if (key !== "email") {
           // Ensure email cannot be updated
           user[key] = req.body[key];
         }
       }
     }
 
     // Save the updated user
     await user.save();
 
     return res.status(200).json({
       success: true,
       message: "updated successfully",
       user,
     });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", success: false });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (user) { 
            return res.status(200).json({ message: "User deleted successfully", success: true })
     }else{
        return res.status(404).json({ message: "User not found", success: false })
     }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            res.status(404).json({message:"Invalid email", success: false, emailError: true})
        }else{
            if(user.password !== password){
                res.status(401).json({message:"Invalid password", success: false, passwordError: true})
            }else{
                res.status(200).json({user, success: true})
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate('properties').populate('favorites');
        if (user) {
            res.status(200).json({ user, success: true });
        } else {
            res.status(404).json({ message: "User not found", success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


exports.updateProfile = async (req, res)=>{
    try {
        const {id} = req.params
        const user = await User.findById(id);
        if(!user){
            res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        if(req.cloudinaryUrls.length > 0){
            user.profileUrl= req.cloudinaryUrls[0]
            await user.save();

            res.status(200).json({
                success:true,
                user
            })
        }

        res.status(404).json({
            success:false,
            message:"Profile url found"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}


exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user) {
            res.status(200).json({ user, success: true });
        } else {
            res.status(404).json({ message: "User not found", success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

