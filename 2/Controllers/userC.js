const Movie = require('../Models/movieM');

// Book a movie
const bookMovie = async (req, res) => {
    try {
        const userId = req.user._id; // Get the user ID from req.user
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send({ error: 'Movie not found.' });
        }
        if (movie.totalSeats - movie.seatsBooked < 1) {
            return res.status(400).send({ error: 'No seats available.' });
        }
        if (movie.bookings.some(booking => booking.userId.toString() === userId.toString())) {
            return res.status(400).send({ error: 'User already booked a seat.' });
        }
        movie.seatsBooked += 1;
        movie.bookings.push({ userId });
        await movie.save();
        res.send(movie);
    } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
    }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
    try {
        const userId = req.user._id; // Get the user ID from req.user
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send({ error: 'Movie not found.' });
        }
        const userBookingIndex = movie.bookings.findIndex(booking => booking.userId.toString() === userId.toString());
        if (userBookingIndex === -1) {
            return res.status(400).send({ error: 'User did not book any seats.' });
        }
        movie.seatsBooked -= 1;
        movie.bookings.splice(userBookingIndex, 1);
        await movie.save();
        res.send(movie);
    } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { bookMovie, cancelBooking };
