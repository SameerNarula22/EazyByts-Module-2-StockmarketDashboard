const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
console.log(process.env.MONGO_URI); // For debugging, ensures .env file is loaded correctly

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/stockMarketDB';
if (!mongoURI) {
  console.error("Mongo URI is missing! Make sure .env file has MONGO_URI set.");
  process.exit(1); // Exit if MONGO_URI is not found
}

// Connect to MongoDB with error handling and timeout setting
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, // Set connection timeout to 30 seconds
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Simple route to test server
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// User model
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number
}));

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password, age } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists!' });
  }

  const newUser = new User({ username, email, password, age });
  await newUser.save();
  res.status(201).json({ message: 'User signed up successfully!' });
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials!' });
  }

  res.status(200).json({ message: 'Login successful!' });
});

// Start the server on a given port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
