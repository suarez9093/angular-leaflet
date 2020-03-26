// Dependencies
const router = require("express").Router();
// require the defined weather routes
const weatherRoutes = require("./weatherRoutes");

// Weather routes use /weather for the endpoint
router.use("/weather", weatherRoutes);

module.exports = router;

