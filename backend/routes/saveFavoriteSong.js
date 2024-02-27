const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Receive post request from the front end, which will have username and favorite song
router.post('/sendFavoriteSong', async (req, res) => {
  const { username, favoriteSong } = req.body;
  
  try {
    const user = await User.findOne({ username });
    
    // Check if the user exists
    if (user) {
      // If the user exists, add the favorite song to the user's data
      user.favoriteSongs.push(favoriteSong);
      await user.save();
  
      return res.status(200).json({ message: 'Song saved!' });

    } else {
      // If the user doesn't exist
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getAllFavoriteSongs:username', async (req, res) => {
  try{
  const { username } = req.params;
  const user = await User.findOne(username)
  //if user is found, grab the song array
  if(user){
    const songsArr =  user.favoriteSongs
    res.status(200).json({songs: songsArr});
  }
  else{
    res.status(404).json({ error: 'User not found' });
  }
  }
  catch(error){
    res.status(500).json({ error: 'Internal Server Error' });
  }

  //
})

module.exports = router;
