const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true 
    },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['bedsitter', '1-bedroom', 'studio', 'shared-room'],
    required: true 
  },
  furnishing: { 
    type: String, 
    enum: ['furnished', 'unfurnished'],
    required: true 
  },
  price: { type: Number, required: true },
  rooms: { type: Number, required: true },
  images: { type: [String], default: [] },
  isListed: { type: Boolean, default: false },
  averageRating: { type: Number, default: 0 },
  location: { type: String, required: true },
  likes:{
    type:[mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: false
  },
  rating:{
    type:Number,
    required: false,
    default: 0,
    minValue: 0,
    maxValue: 5
  }


}, {timestamps: true});

module.exports = mongoose.model('Property', PropertySchema);