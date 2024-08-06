const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/deleteEvents', async (req, res) => {
  const { username, eventsToDelete } = req.body;
  console.log(req.body);


  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('user is ' ,)
    console.log('scheduleInfo is ', user.scheduleInfo)

    // Remove events with matching IDs
    user.scheduleInfo = user.scheduleInfo.filter(event => !eventsToDelete.includes(event.eventName));

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Events deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/grabAllEvents/:username', async (req, res) => {

  const{ username } = req.params
  try {
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
  const allData = user.scheduleInfo;

  return res.status(200).json({ allData });
    
  } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/saveEvent', async (req, res) => {
  const { username, dateTime, eventName } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    user.scheduleInfo.push({dateTime, eventName});
    await user.save();

    return res.status(200).json({ message: 'Event saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;