const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  propertyId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String, 
    required: true 
  },
  likes:{
    type:[mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: false
  },
    dislikes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: false
    },
}, { timestamps: true });