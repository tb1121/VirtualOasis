const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
});

const scheduleSchema = new mongoose.Schema({
  eventName: {
      type: String,
      required: true,
  },
  dateTime: {
      type: Date, // Use Date type for time
      required: true,
  },
})
 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  savedNotes: [
    {
      type: String,
    },
  ],
  favoriteSongs: [
    {
      type: String,
    },
  ],
  weatherInfo: [weatherSchema],
  scheduleInfo: [scheduleSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
