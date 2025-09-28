const mongoose = require('mongoose');
const calc = require('./calc');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  calc:{calcSchema}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
