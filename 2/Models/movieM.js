const mongoose = require("mongoose");

const movieStruct = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieStruct);
