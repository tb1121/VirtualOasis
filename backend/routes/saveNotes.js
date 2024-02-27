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

// router.get('/get-previous-note', async (req, res) => {
//   res.send('hello from /get-previous-note!' )
// })

// router.get('/get-previous-note/:username', async (req, res) => {
//   console.log('Received request for previous note');
//   const { username } = req.params;
//   console.log(username)
  

//   try {
//     // Find the user by username
//     const user = await User.findOne({ username });
//     console.log('findOne user ', user)

//     // If the user is found and has a current note index
//     if (user && user.currentNoteIndex) {
//       // Ensure the index is within bounds
//       if (user.currentNoteIndex > 0) {
//         // Decrement the index to get the previous note
//         const previousNoteIndex = user.currentNoteIndex - 1;
//         const previousNoteContent = user.savedNotes[previousNoteIndex];

//         // Update the current note's index in the user's data
//         user.currentNoteIndex = previousNoteIndex;
//         await user.save();

//         return res.status(200).json({ previousNoteContent });
//       } else {
//         return res.status(404).json({ message: 'No previous note available' });
//       }
//     } else {
//       return res.status(404).json({ message: 'User not found or no current note index' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

router.post('/save-notes', async (req, res) => {
  const { username, content } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If the user is found, save the note
    if (user) {
      // Add the note to the user's savedNotes array
      user.savedNotes.push(content);
      await user.save();

      return res.status(200).json({ message: 'Note saved successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

