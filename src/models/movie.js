const mongoose = require("mongoose");

const TimeSlotSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  reserved_count: {
    type: Number,
    default: 0,
  },
});

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timeSlots: [TimeSlotSchema],
});

module.exports = mongoose.model("Movie", MovieSchema);
