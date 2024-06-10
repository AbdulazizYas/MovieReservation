const Movie = require("../models/movie");
const mongoose = require("mongoose");

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went Wrong.." });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const { movieId, timeSlotId } = req.params;

    // For hiding details of id format
    // if we returned 400 for invalid id, it will expose the data layer mechanism
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(404).json({ message: "Movie Not Found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie Not Found" });
    }

    // Same as movie
    if (!mongoose.Types.ObjectId.isValid(timeSlotId)) {
      return res.status(404).json({ message: "Time Slot Not Found" });
    }

    const timeSlot = movie.timeSlots.id(timeSlotId);
    if (!timeSlot) {
      return res.status(404).json({ message: "Time Slot Not Found" });
    }

    res.json({ remaining: timeSlot.capacity - timeSlot.reserved_count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went Wrong.." });
  }
};

exports.reserveTimeSlot = async (req, res) => {
  try {
    const { movieId, timeSlotId } = req.params;
    const { numberOfPeople } = req.body;

    // Check if numberOfPeople is a number
    if (
      typeof numberOfPeople !== "number" ||
      !Number.isInteger(numberOfPeople)
    ) {
      return res
        .status(400)
        .json({ message: "The number of people must be an integer." });
    }

    // Check if numberOfPeople > 0
    if (numberOfPeople <= 0) {
      return res
        .status(400)
        .json({ message: "The number of people must be greater than 0" });
    }

    // For hiding details of id format
    // if we returned 400 for invalid id, it will expose the data layer mechanism
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(404).json({ message: "Movie Not Found" });
    }

    // Check if movieId exist
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie Not Found" });
    }

    // Same as movie
    if (!mongoose.Types.ObjectId.isValid(timeSlotId)) {
      return res.status(404).json({ message: "Time Slot Not Found" });
    }

    // Check if timeSlotId exist
    const timeSlot = movie.timeSlots.id(timeSlotId);
    if (!timeSlot) {
      return res.status(404).json({ message: "Time Slot Not Found" });
    }

    // Check availability
    if (timeSlot.reserved_count + numberOfPeople > timeSlot.capacity) {
      return res.status(400).json({ message: "Not Enough Capacity" });
    }

    timeSlot.reserved_count += numberOfPeople;
    await movie.save();

    res.json({
      message: "Reserved Successfully",
      remaining: timeSlot.capacity - timeSlot.reserved_count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went Wrong.." });
  }
};
