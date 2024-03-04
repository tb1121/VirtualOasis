const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/getResults', async (req, res) => {
  const { searchQuery } = req.body;
  const apiKey = 'AIzaSyDWoqxwYsBz9P1YCNqcNLDfaW3yaCeP5lI'; // Replace with your actual Google API key

  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: apiKey,
        cx: 'd4a14a3f93c2e4368',
        q: searchQuery,
      },
    });

    const searchData = response.data;
    res.json(searchData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
