const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate' });
    req.userId = decoded.id;
    next();
  });
};

// Create Job Posting (Protected)
router.post('/post', verifyToken, async (req, res) => {
  const { title, description, location, salary } = req.body;
  try {
    const job = new Job({ title, description, location, salary, postedBy: req.userId });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Error creating job', error: err });
  }
});

// Get all jobs (Public)
router.get('/all', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'email');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs', error: err });
  }
});

module.exports = router;
