const Property = require('../models/property.model');
const User = require('../models/user.model');


exports.createProperty = async (req,res)=>{
    try {
        const data = req.body;
        data.images = req.cloudinaryUrls; // Assuming you have a middleware that uploads images to Cloudinary and attaches the URLs to req.cloudinaryUrls
        const property = await Property.create(data);
        res.status(201).json({property, success: true})
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
        const property = await Property.findById(propertyId)
        .populate('ownerId', 'firstName lastName profileUrl phoneNumber email');
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

exports.likeProperty = async (req, res) => {
    try {
        const {userId, propertyId} = req.body;
        const user = await User.findById(userId);
        const property = await Property.findById(propertyId);
        if(user && property){
            if(property.likes.includes(userId)){
                property.likes = property.likes.filter((id) => id.toString() !== userId)
                await property.save();
            }else{
                property.likes.push(userId);
                await property.save();
            }
            res.status(200).json({property, success: true})
        } else{
            res.status(404).json({message:"User or property not found", success: false})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", success: false})
        
    }
}

exports.addToFavorites = async (req, res) => {
    try {
        const {userId, propertyId} = req.body;
        const user = await User.findById(userId);
        const property = await Property.findById(propertyId);
        if(user && property){
            if(user.favorites.includes(propertyId)){
                user.favorites = user.favorites.filter((id) => id.toString() !== propertyId)
                await user.save();
            }else{
                user.favorites.push(propertyId);
                await user.save();
            }
            res.status(200).json({user, success: true})
        }
        else{
            res.status(404).json({message:"User or property not found", success: false})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", success: false})
        
    }
}


exports.searchProperties = async (req, res) => {
   
    try {
        console.log(req.query)
      const { location, priceRange, bedCount } = req.query;
  
      // Build the query object
      const query = {};
  
      // Handle location search
      if (location) {
        const keywords = location.split(" ").filter((word) => word.trim() !== ""); // Split location into words
        query.$or = [
          { title: { $regex: keywords.join("|"), $options: "i" } }, // Match any keyword in the title
          { address: { $regex: keywords.join("|"), $options: "i" } }, // Match any keyword in the address
          { location: { $regex: keywords.join("|"), $options: "i" } }, // Match any keyword in the location field
        ];
      }
  
      // Handle price range
      if (priceRange && priceRange !== "any") {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);
        query.price = {};
        if (!isNaN(minPrice)) query.price.$gte = minPrice;
        if (!isNaN(maxPrice)) query.price.$lte = maxPrice;
        if (priceRange === "1500+") query.price.$gte = 1500;
      }
  
      // Handle bed count
      if (bedCount && bedCount !== "any") {
        query.bedrooms = { $gte: parseInt(bedCount, 10) };
      }
  
      // Query the database
      const properties = await Property.find(query).populate("ownerId").exec();
  
      // Send the results back to the frontend
      res.status(200).json({
        success: true,
        properties,
      });
    } catch (error) {
      console.error("Error searching properties:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };


exports.getUserProperties = async (req, res) => {
    try {
        const userId = req.params.id;
        const properties = await Property.find({ ownerId: userId }).populate('ownerId', 'firstName lastName profileUrl phoneNumber email');
        if(properties.length > 0){
            res.status(200).json({properties, success: true})
        }else{
            res.status(404).json({message:"No properties found", success: false})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error", success: false})
    }
}


