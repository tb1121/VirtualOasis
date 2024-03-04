const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/get-all-notes/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If the user is found, check if they have any saved notes
    if (user && user.savedNotes.length > 0) {
      // Retrieve the content and index of the most recent note
      const mostRecentNoteIndex = user.savedNotes.length - 1;
      const allNotes = user.savedNotes;

      // Store the current note's index in the user's data
      // user.currentNoteIndex = mostRecentNoteIndex;
      await user.save();

      return res.status(200).json({ allNotes });
    } else {
      return res.status(404).json({ message: 'User not found or no saved notes' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/save-notes', async (req, res) => {
  const { username, content } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingContent = user.savedNotes.find(savedNote => savedNote === content);

    if (existingContent) {
      return res.status(200).json({ message: 'Note already saved!' });
    }

    user.savedNotes.push(content);
    await user.save();

    return res.status(200).json({ message: 'Note saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;

