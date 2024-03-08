const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');

router.post('/getWeather', async (req, res) => {
  const { searchQuery, username } = req.body;
  const apiKey = 'ec04f3327f67475fbe863228240703';
  const q = searchQuery;

  try {
    const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
      params: {
        key: apiKey,
        q: q,
      },
    });

    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
