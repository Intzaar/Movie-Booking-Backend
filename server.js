const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const userR = require("./2/Routes/userR");
const adminR = require("./2/Routes/adminR.js");
const Movie = require("./2/Models/movieM.js");

const port = process.env.PORT || 5000;
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

const app = express();

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies
    res.status(200).json(movies);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    res.status(500).json({ message: "Server Error" });
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", getMovies);
app.use("/user", userR);
app.use("/admin", adminR);

app.listen(port, () => console.log(`Server started on port ${port}`));
