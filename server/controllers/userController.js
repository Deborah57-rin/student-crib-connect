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
        console.log(req.body)
        const user = await User.create(req.body);
        res.status(201).json({user, success: true})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", success: false})
    }
}

exports.updateUser = async (req, res) => {
    try {
    const userId = req.params.id;

    const user = await User.findById(userId);

      if (user) {
        user.profileUrl = req.body.profileUrl;
        await user.save();
        res.status(200).json({ user, success: true });
      } else {
        res.status(404).json({ message: "User not found", success: false });
      }
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