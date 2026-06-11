import express from 'express';
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  updateBookingStatus
} from '../controllers/bookingController.js';

import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - customer can create booking
router.post('/', createBooking);

// Admin only routes
router.get('/', protect, adminOnly, getBookings);
router.get('/:id', protect, adminOnly, getBookingById);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);
router.delete('/:id', protect, adminOnly, deleteBooking);

export default router;