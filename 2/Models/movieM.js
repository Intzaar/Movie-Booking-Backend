const mongoose = require("mongoose");

const movieStruct = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  seatsBooked: {
    type: Number,
    default: 0,
  },
  duration: {
    type: String,
    required: true,
  },
  bookings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

module.exports = mongoose.model("Movie", movieStruct);
