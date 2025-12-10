const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },  // <-- MUST BE EXACT NAME
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
