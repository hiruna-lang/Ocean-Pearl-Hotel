import { query } from '../config/db.js';
import { formatBooking } from '../utils/mysqlFormatters.js';

const bookingSelect = `
  SELECT
    b.id,
    b.customerName,
    b.email,
    b.phone,
    b.roomId,
    b.roomType,
    b.checkIn,
    b.checkOut,
    b.guests,
    b.specialRequest,
    b.status,
    b.created_at,
    b.updated_at
  FROM bookings b
`;

const allowedStatuses = ['Pending', 'Confirmed', 'Cancelled'];

const normalizeStatus = (status) => {
  if (!status) return 'Pending';

  const formattedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return allowedStatuses.includes(formattedStatus) ? formattedStatus : null;
};

export const createBooking = async (req, res) => {
  try {
    const customerName = req.body.customerName || req.body.name;
    const email = req.body.email;
    const phone = req.body.phone || null;
    const roomId = req.body.roomId || null;
    const roomType = req.body.roomType || req.body.room_name || req.body.selectedRoom;
    const checkIn = req.body.checkIn || req.body.check_in;
    const checkOut = req.body.checkOut || req.body.check_out;
    const guests = Number(req.body.guests || 1);
    const specialRequest = req.body.specialRequest || req.body.special_request || '';
    const status = normalizeStatus(req.body.status);

    if (!customerName || !email || !roomType || !checkIn || !checkOut) {
      return res.status(400).json({
        message: 'Please fill all required booking fields'
      });
    }

    if (!status) {
      return res.status(400).json({
        message: 'Invalid booking status'
      });
    }

    const [result] = await query(
      `
      INSERT INTO bookings
      (customerName, email, phone, roomId, roomType, checkIn, checkOut, guests, specialRequest, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        customerName,
        email,
        phone,
        roomId,
        roomType,
        checkIn,
        checkOut,
        guests,
        specialRequest,
        status
      ]
    );

    const [rows] = await query(
      `${bookingSelect} WHERE b.id = ? LIMIT 1`,
      [result.insertId]
    );

    if (rows.length === 0) {
      return res.status(500).json({
        message: 'Booking created but could not be loaded'
      });
    }

    res.status(201).json({
      message: 'Booking saved successfully',
      booking: formatBooking(rows[0])
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      message: 'Database error while creating booking',
      error: error.message
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const [rows] = await query(
      `${bookingSelect} ORDER BY b.created_at DESC`
    );

    res.json(rows.map(formatBooking));
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      message: 'Database error while loading bookings',
      error: error.message
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const [rows] = await query(
      `${bookingSelect} WHERE b.id = ? LIMIT 1`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Booking not found'
      });
    }

    res.json(formatBooking(rows[0]));
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({
      message: 'Database error while loading booking',
      error: error.message
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const [existingRows] = await query(
      'SELECT id FROM bookings WHERE id = ? LIMIT 1',
      [req.params.id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({
        message: 'Booking not found'
      });
    }

    const status = normalizeStatus(req.body.status);

    if (!status) {
      return res.status(400).json({
        message: 'Invalid status. Use Pending, Confirmed, or Cancelled'
      });
    }

    await query(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    const [rows] = await query(
      `${bookingSelect} WHERE b.id = ? LIMIT 1`,
      [req.params.id]
    );

    res.json({
      message: 'Booking status updated successfully',
      booking: formatBooking(rows[0])
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      message: 'Database error while updating booking status',
      error: error.message
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const [result] = await query(
      'DELETE FROM bookings WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Booking not found'
      });
    }

    res.json({
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      message: 'Database error while deleting booking',
      error: error.message
    });
  }
};