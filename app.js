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


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Post-it Media API!');
});


// Start the server
app.listen(Port, () => {
console.log(`Server started on port ${Port}`);
});










// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Create an instance of the Express application
// const app = express();

// // Set up middleware to parse incoming request bodies as JSON
// app.use(bodyParser.json());

// // Enable CORS for all routes
// app.use(cors());

// // Connect to the MongoDB database using Mongoose
// mongoose.connect('mongodb://localhost/postit', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// }).then(() => {
//   console.log('Connected to MongoDB database');
// }).catch((error) => {
//   console.error('Error connecting to MongoDB database:', error);
// });

// // Define the routes for the Postit API
// const usersRoutes = require('./routes/users');
// const postsRoutes = require('./routes/posts');
// const commentsRoutes = require('./routes/comments');

// app.use('/users', usersRoutes);
// app.use('/posts', postsRoutes);
// app.use('/posts/:postId/comments', commentsRoutes);

// // Start the Express application
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });




    
