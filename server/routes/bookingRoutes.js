import express from 'express';
import { createBooking, deleteBooking, getBookingById, getBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', protect, adminOnly, getBookings);
router.get('/:id', protect, adminOnly, getBookingById);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);
router.delete('/:id', protect, adminOnly, deleteBooking);

export default router;