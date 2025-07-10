const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceRequestSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  commodity_type: {
    type: String,
    required: true
  },
  issue_description: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: false
  },
  preferred_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'Pending'
  },
  assigned_provider_id: {
    type: Schema.Types.ObjectId,
    ref: 'ServiceProvider'
  },
}, {
  timestamps:
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);