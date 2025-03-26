const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const trainingRoutes = require("./routes/trainings");

const app = express(); // <== This must come before app.use()

app.use(express.json());
app.use(cors());

// Use routes
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/trainings", trainingRoutes);

// Mongo connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
