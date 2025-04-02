const Property = require('../models/property.model');
const User = require('../models/user.model');

exports.createProperty = async (req,res)=>{
    try {
        const ownerId = req.body.ownerId;
        const user = await User.findById(ownerId);
        if(user){
            const property = await Property.create(req.body);
            res.status(201).json({property, success: true})
        }else{
            res.status(404).json({message:"User not found", success: false})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", success: false})
    }

}


exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find({})
        .populate('ownerId', 'firstName lastName profileUrl phoneNumber email')
        .limit(10)
        .sort({
            createdAt: -1
        });
        if(properties.length > 0){
            res.status(200).json({properties, success: true})
        }else{
            res.status(404).json({message:"No properties found", success: false})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", success: false})
    }
};

exports.getPropertyById = async (req, res) =>{
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);
        if(property){
            res.status(200).json({property, success: true})
        }else{
            res.status(404).json({message:"Property not found", success: false})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", success: false})
    }
}

exports.updateProperty = async(req, res) => {
    try {
        const propertyId = req.params.id; 
        const updates = req.body; 

        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
            updates,
            { new: true, runValidators: true } 
        );

        if (updatedProperty) {
            res.status(200).json({ property: updatedProperty, success: true }); 
        } else {
            res.status(404).json({ message: "Property not found", success: false }); 
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Internal server error", success: false }); 
    }
}

