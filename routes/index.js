// // Dependencies
// // =============================================
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const openWeather = require("./openweather");

// API Routes
// Declaring the route to use for endpoints
router.use("/api", apiRoutes);
router.use("/openweather", openWeather)

// If no API routes are hit, send the Angular app
router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"));
});

module.exports = router;
