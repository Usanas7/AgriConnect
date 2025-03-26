const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Job = require("../models/Job");

// Create a new job
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newJob = new Job({ ...req.body, postedBy: req.user.id });
    await newJob.save();
    res.json(newJob);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
