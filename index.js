const express = require("express");

const tripRoutes = require("./routes/tripRoutes");

const app = express();

app.use(express.json());

// Original Trips API endpoints
app.use("/trips", tripRoutes);

// Comparison endpoint required by Lab 5.2
app.use("/api/v1/trips", tripRoutes);

module.exports = app;