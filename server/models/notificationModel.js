const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  provider_id: {
    type: Schema.Types.ObjectId,
    ref: 'ServiceProvider'
  },
  message: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema);