const Movie = require("../Models/movieM");
const User = require("../Models/userM");

// Add a movie
const addMovie = async (req, res) => {
  try {
    const { name, totalSeats, duration } = req.body;
    if (!name || !totalSeats || !duration) {
      return res.status(400).json({ error: "Please add all fields" });
    }
    const newMovie = new Movie({ name, totalSeats, duration });
    await newMovie.save();
    res.status(201).json({
      _id: newMovie.id,
      name: newMovie.name,
      availableSeats: newMovie.totalSeats,
      duration: newMovie.duration,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

// Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "404 Movie not Found" });
    } else if (movie.seatsBooked > 0) {
      return res
        .status(400)
        .json({ error: "Cannot delete movie as there are seats booked" });
    }
    await movie.deleteOne();
    return res.status(200).json({ id: req.params.id, msg: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { addMovie, deleteMovie };
