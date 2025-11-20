const express = require('express');
require('dotenv').config();
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000',
  'https://virtual-oasis-frontend.fly.dev'
  ],
  credentials: true // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());

const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const saveNotesRouter = require('./routes/saveNotes');
const saveFavoriteSongRouter = require('./routes/saveFavoriteSong')
const searchInternet = require('./routes/searchInternet');
const findWeather = require('./routes/findWeather');
const deleteSongs = require('./routes/deleteSongs');
const scheduleEvent = require('./routes/scheduleEvent');
const MONGO_URI = process.env.MONGO_URI;


// Connect to MongoDB
mongoose.connect(MONGO_URI, {
});

// Handle MongoDB connection events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set up routes with appropriate prefixes
app.use('/api/', signupRouter);
app.use('/api/', loginRouter);
app.use('/api/notes', saveNotesRouter);
app.use('/api/saveFavoriteSong', saveFavoriteSongRouter);
app.use('/api/internet', searchInternet);
app.use('/api/findWeather', findWeather);
app.use('/api/deleteSongs', deleteSongs);
app.use('/api/scheduleEvent', scheduleEvent);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});


//route to favorite song is /api/favoriteSong/sendFavoriteSong