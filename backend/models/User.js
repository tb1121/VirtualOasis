const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  savedNotes: [
    {
      type: String,
    },
  ],
  favoriteSongs: [
    {
      type: String,
    },
  ],
  weatherInfo: [weatherSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
