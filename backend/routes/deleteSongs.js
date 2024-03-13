const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.delete('/deleteFavoriteSong', async (req, res) => {
  const { username, favoriteSong } = req.body;

  try {
    // Find username and set to variable
    const user = await User.findOne({ username });

    // If no user, return 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user exists, delete favoriteSong from array
    // Check if there is a match
    const songFoundIndex = user.favoriteSongs.findIndex(
      (savedSong) => savedSong === favoriteSong
    );

    // If songFoundIndex is not -1, delete it from the array
    if (songFoundIndex !== -1) {
      user.favoriteSongs.splice(songFoundIndex, 1);
      await user.save();
      return res.status(200).json({ message: 'Song deleted from favorites!' });
    } else {
      return res.status(404).json({ message: 'Song not found in favorites' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
