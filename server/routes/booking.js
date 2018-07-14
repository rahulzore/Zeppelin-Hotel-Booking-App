const express = require('express');
const router = express.Router();
const BookingController = require('../controller/booking');


const UserController = require('../controller/user');



router.post('', UserController.authMiddleware, BookingController.createBooking);

router.get('/manage', UserController.authMiddleware, BookingController.getUserBookings );



module.exports = router;
