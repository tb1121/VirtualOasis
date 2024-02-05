const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

app.use(express.json());
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Taylor:PNJ009ylWsBLcTIi@assessment.i6oru1a.mongodb.net/', {
});

// Handle MongoDB connection events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api', signupRouter);
app.use('/api', loginRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
