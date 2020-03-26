// CREATE ROUTES TO DATABASE -----------------------------------------------
const router = require("express").Router();
const weatherController = require("../../controllers/weatherController");

// Matches with "/api/weather"
router.route("/")
    .get(weatherController.findAll) // query the db on this route run the get method defined in the controller
    .post(weatherController.create); // allows a post request to be handeled on this route

// Matches with "/api/weather/:id"
router.route("/:id")
    .get(weatherController.findById)  // when a identifying paramater is hit run either one of these three methods to be able to get, edit or delete the specific resource
    .put(weatherController.update)
    .delete(weatherController.remove);



module.exports = router;
