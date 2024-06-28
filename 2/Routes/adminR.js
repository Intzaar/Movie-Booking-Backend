const express = require("express");
const router = express.Router();
const { adminLogin } = require("../Controllers/authC");
const { addMovie, updateMovie, deleteMovie } = require("../Controllers/adminC");
const { protect } = require("../Middleware/authB");

// login
// add movie
// delete movie
// update movie

router.post("/login", adminLogin);
router.post("/addMovie", protect, addMovie);
router.put("/updateMovie/:id", protect, updateMovie);
router.delete("/deleteMovie/:id", protect, deleteMovie);

module.exports = router;
