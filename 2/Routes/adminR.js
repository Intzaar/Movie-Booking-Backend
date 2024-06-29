const express = require("express");
const router = express.Router();
const { adminLogin } = require("../Controllers/authC");
const { addMovie, deleteMovie } = require("../Controllers/adminC");
const { protect,checkRole } = require("../Middleware/authB");

// login
// add movie
// delete movie
// update movie

router.post("/login", adminLogin);
router.post('/movies', protect, checkRole('admin'), addMovie);
router.delete('/movies/:id', protect, checkRole('admin'), deleteMovie);
module.exports = router;
