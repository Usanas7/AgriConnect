const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Training = require("../models/Training");

// Create a new training
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newTraining = new Training({ ...req.body, hostedBy: req.user.id });
    await newTraining.save();
    res.json(newTraining);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all training programs
router.get("/", async (req, res) => {
  try {
    const trainings = await Training.find().populate("hostedBy", "name");
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
