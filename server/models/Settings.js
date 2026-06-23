const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  studioName: {
    type: String,
    default: 'Shri Ramji Photo State'
  },
  tagline: {
    type: String,
    default: 'Capturing Your Precious Moments'
  },
  phone: String,
  email: String,
  address: String,
  whatsapp: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Settings', settingsSchema);
