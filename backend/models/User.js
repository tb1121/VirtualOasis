const mongoose = require('mongoose');

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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FavoriteSong',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
