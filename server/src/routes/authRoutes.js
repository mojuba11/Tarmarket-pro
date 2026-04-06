const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/auth'); // To verify if a user is still 'logged in'

// @route   POST api/auth/register
// @desc    Register a new Influencer or Worker
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', login);

// @route   GET api/auth/user
// @desc    Get current user's profile data (Private)
router.get('/user', auth, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;