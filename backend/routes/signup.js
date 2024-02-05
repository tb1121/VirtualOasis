const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Handling GET requests
router.get('/signup', (req, res) => {
  res.send('Hello from GET /api/signup!');
});

// Handling POST requests
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try{
    const existingUser = await User.findOne({ username });
    if(existingUser){
      return res.status(401).json( {message: 'User already exists, please Login'})
    }
    const newUser = new User({
      username,
      password,
    })
    await newUser.save()
    res.status(200).json({ message: 'Signup successful!' });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error '})
  }

  });
  



module.exports = router;
