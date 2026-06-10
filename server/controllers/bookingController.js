import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBookings = async (req, res) => {
  const bookings = await Booking.find().populate('roomId').sort({ createdAt: -1 });
  res.json(bookings);
};

export const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('roomId');
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  res.json(booking);
};

export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  booking.status = req.body.status ?? booking.status;
  const updatedBooking = await booking.save();
  res.json(updatedBooking);
};

export const deleteBooking = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  res.json({ message: 'Booking deleted successfully' });
};