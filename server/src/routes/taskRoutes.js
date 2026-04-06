const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
    getAvailableTasks, 
    submitTaskProof, 
    requestWithdrawal 
} = require('../controllers/taskController');

// Middleware to restrict access to Workers only
const isWorker = (req, res, next) => {
  if (req.user.role !== 'worker') {
    return res.status(403).json({ msg: 'Access denied: Workers only' });
  }
  next();
};

// @route   GET api/tasks/available
// @desc    List all active campaigns workers can join
router.get('/available', auth, getAvailableTasks);

// @route   POST api/tasks/submit
// @desc    Submit proof of video watch for payment
router.post('/submit', [auth, isWorker], submitTaskProof);

// @route   POST api/tasks/withdraw
// @desc    Transfer wallet balance to bank account
router.post('/withdraw', [auth, isWorker], requestWithdrawal);

module.exports = router;