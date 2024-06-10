require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("./models/movie");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Clear existing movies
    await Movie.deleteMany();

    // Sample movies to be added to the database
    const harryPoter = new Movie({
      title: "Harry Poter",
      timeSlots: [
        { time: "10:00 AM", capacity: 50 },
        { time: "12:00 PM", capacity: 50 },
        { time: "1:00 PM", capacity: 30 },
      ],
    });

    const spiderman = new Movie({
      title: "Spiderman",
      timeSlots: [
        { time: "2:00 PM", capacity: 30 },
        { time: "4:00 PM", capacity: 30 },
        { time: "6:00 PM", capacity: 60 },
      ],
    });

    // Save sample movies to the database
    await harryPoter.save();
    await spiderman.save();

    console.log("Database Seeded");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
