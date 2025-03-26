const express = require("express");
const router = express.Router();

// Example training route (you can add more logic later)
router.get("/", (req, res) => {
    res.json({ msg: "List of trainings" });
});

module.exports = router;
