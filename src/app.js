require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const movieRouter = require("./routes/movieRouter");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Successfully Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting: ", err);
  });

app.use("/api/v1/movies", movieRouter);

app.listen(port, () => {
  console.log(`Listening on Port: ${port} ...`);
});
