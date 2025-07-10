const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceProviderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true,
    unique: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  services_offered: {
    type: String,
    required: true
  },
  experience_years: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  ratings_avg: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
},
  {
    timestamps:
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);