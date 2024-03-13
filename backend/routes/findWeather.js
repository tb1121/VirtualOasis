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

router.post('/setWeather', async (req,res) => {
  const {currWeather, location, condition, username} = req.body;
  //currWeather is number, location is string, condition is string
  try{
    const user = await User.findOne({username})
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newWeatherEntry = {
      currWeather,
      location,
      condition,
    }

    user.weatherInfo.push(newWeatherEntry)
    await user.save()
    res.status(200).json({ message: 'Weather information saved successfully!' });

  }
  catch(error){
    console.error('Error setting weather:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

//http://localhost:3001/api/findWeather/mostRecentWeatherData?username

router.get('/mostRecentWeatherData/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.weatherInfo || user.weatherInfo.length === 0) {
      return res.status(404).json({ message: 'Weather information not found' });
    }

    const weather = user.weatherInfo[0];
    return res.send(weather);
  } catch (error) {
    console.error('Error getting weather data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
