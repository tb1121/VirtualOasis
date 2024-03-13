const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

app.use(express.json());
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const saveNotesRouter = require('./routes/saveNotes');
const saveFavoriteSongRouter = require('./routes/saveFavoriteSong')
const searchInternet = require('./routes/searchInternet');
const findWeather = require('./routes/findWeather');
const deleteSongs = require('./routes/deleteSongs')

// Connect to MongoDB
mongoose.connect('mongodb+srv://Taylor:PNJ009ylWsBLcTIi@assessment.i6oru1a.mongodb.net/', {
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//route to favorite song is /api/favoriteSong/sendFavoriteSong