const express = require('express');
const router = express.Router();
const User = require('../models/User');




// Handling GET requests
router.get('/login', (req, res) => {
  
  res.send('Hello from GET /api/login!');
});

// Handling POST requests
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try{
    const existingUser = await User.findOne({ username });
    if(!existingUser || existingUser.password !== password){
      return res.status(401).json( {message: 'Invalid Username or Password'})
    }
    
    res.cookie('user', 'taylor', { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
    
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error '})
  }

  });
  



module.exports = router;
