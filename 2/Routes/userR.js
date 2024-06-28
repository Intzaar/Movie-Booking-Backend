const express = require("express");
const router = express.Router();
const { login, register } = require("../Controllers/authC");
const { bookMovie, cancelBooking } = require("../Controllers/userC");
const { protect } = require("../Middleware/authB");

// login
// bookmovie
// cancel booking

router.post("/register", register);
router.post("/login", login);
router.post("/bookMovie", protect, bookMovie);
router.delete("/cancelBooking", protect, cancelBooking);

module.exports = router;
