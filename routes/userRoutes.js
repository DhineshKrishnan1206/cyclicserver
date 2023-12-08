const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage });
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: false, message: 'Invalid email or password' });
    }
    if (password !== user.password) {
      return res.status(401).json({ status: false, message: 'Invalid email or password' });
    }
    return res.status(200).json({ status: true, userId: user._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
});

  
router.post('/users', upload.single('profileImage'), async (req, res) => {
  try {
    const { username, email, password,profileImage } = req.body;
    const newUser = await User.create({ username, email, password, profileImage });
    
    return res.status(201).json({ status: true, userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
});

router.get('/users/:userId', async (req, res) => {
    try {
      let userId = req.params.userId;
      userId = userId.trim();
      if (!userId) {
        return res.status(400).json({ status: false, message: 'Invalid User ID' });
      }
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }
      return res.status(200).json({ status: true, user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
});


module.exports = router;
