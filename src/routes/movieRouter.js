const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");

router.get("/", MovieController.getMovies);
router.get("/:movieId/:timeSlotId", MovieController.checkAvailability);
router.post("/:movieId/:timeSlotId", MovieController.reserveTimeSlot);

module.exports = router;
