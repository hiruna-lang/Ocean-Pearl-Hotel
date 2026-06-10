import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true, trim: true },
    roomType: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    facilities: [{ type: String }],
    maxGuests: { type: Number, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Room', roomSchema);