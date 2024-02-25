const mongoose = require('mongoose');

const favoriteSongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: String,
  // Add more fields as needed
});

const FavoriteSong = mongoose.model('FavoriteSong', favoriteSongSchema);

module.exports = FavoriteSong;
