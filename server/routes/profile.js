const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  const u = await User.findById(req.userId).select('-passwordHash');
  res.json(u);
});

router.post('/', auth, async (req, res) => {
  const { name, className, email, avatar } = req.body;
  try {
    await User.findByIdAndUpdate(req.userId, { name, className, email, avatar });
    res.json({ message: 'saved' });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
