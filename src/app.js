//Welcome to my social  API


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const Port = process.env.PORT || 5000;

// Connect to MongoDB database
const mongoDB = process.env.MongoDB_URI;
mongoose.set('strictQuery',true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('database: connected!')).catch(err => console.log(err))


// Middleware
app.use(bodyParser.json());
app.use(cors());


// Define the routes for the Postit API
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const replyRoute = require('./routes/replyRoute');
const usersRoute = require('./routes/userRoute')

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/comment', commentRoute);
app.use('/api/v1/reply', replyRoute);



// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Post-it Media API!');
});

app.get('/api/v1/docs', (req, res) => {
  res.redirect("jesus help me abeg nepa have finish me ")
});


// Start the server
app.listen(Port, () => {
console.log(`Server started on port ${Port}`);
});






