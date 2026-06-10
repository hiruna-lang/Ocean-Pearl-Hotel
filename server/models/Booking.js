import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    roomType: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true },
    specialRequest: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Checked In', 'Cancelled'], default: 'Pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);