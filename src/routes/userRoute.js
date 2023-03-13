
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const {authenticateToken} = require("../middlewares/auth");


// Route for creating a new user
router.post('/api/v1/users', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Generate random avatar
      const getRandomAvatarStyle = () => {
        return avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
      };
      const avatarStyles = [
        'adventurer',
        'adventurer-neutral',
        'avataaars',
        'avataaars-neutral',
        'big-ears',
        'big-ears-neutral',
        'big-smile',
        'bottts',
        'bottts-neutral',
        'croodles',
        'croodles-neutral',
        'fun-emoji',
        'icons',
        'identicon',
        'initials',
        'lorelei',
        'lorelei-neutral',
        'micah',
        'miniavs',
        'open-peeps',
        'personas',
        'pixel-art',
        'pixel-art-neutral',
        'shapes',
        'thumbs',
      ];
      const avatarStyle = getRandomAvatarStyle();
      const avatarUrl = await generateRandomAvatar(email, avatarStyle);
  
      // Create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, avatarUrl });
      await user.save();
  
      // Return user object
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message});
    }
});


// Route for logging in
router.post('/api/v1/users/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      // Generate and return JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
      });
      
      res.json({ token });
    } catch (error) {
       console.error(error.message);
       res.status(500).send('Server Error');
      }
}); 
     
  
  
  
  
  
  
// Route for updating a user's profile
router.put('/users/profile', authenticateToken, async (req, res) => {
const { name, email, password } = req.body;

try {
    // Find the user by ID
    const user = await User.findById(req.user.id);


    // Update the user's profile fields
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    }

    // Save the updated user to the database
    await user.save();

    // Generate and return JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
    });

    res.json({ token });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
});

// Route for deleting a user's account
router.delete('/users', authenticateToken, async (req, res) => {
try {
    // Find the user by ID and remove it
    await User.findByIdAndRemove(req.user.id);

res.json({ message: 'Account deleted successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
});



 // Route for deleting a Post-it user's account
router.delete('/users/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);


    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }

    // Soft delete the user
    user.deletedAt = new Date();
    await user.save();

    // Return success response
    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;





