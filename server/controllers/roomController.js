import Room from '../models/Room.js';

const parseFacilities = (facilities) => {
  if (!facilities) {
    return [];
  }

  if (Array.isArray(facilities)) {
    return facilities;
  }

  if (typeof facilities === 'string') {
    try {
      const parsedFacilities = JSON.parse(facilities);
      return Array.isArray(parsedFacilities) ? parsedFacilities : facilities.split(',').map((item) => item.trim()).filter(Boolean);
    } catch (error) {
      return facilities.split(',').map((item) => item.trim()).filter(Boolean);
    }
  }

  return [];
};

export const getRooms = async (req, res) => {
  const rooms = await Room.find().sort({ createdAt: -1 });
  res.json(rooms);
};

export const getRoomById = async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }
  res.json(room);
};

export const createRoom = async (req, res) => {
  try {
    const room = await Room.create({
      roomName: req.body.roomName,
      roomType: req.body.roomType,
      price: req.body.price,
      description: req.body.description,
      facilities: parseFacilities(req.body.facilities),
      maxGuests: req.body.maxGuests,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
      available: req.body.available !== undefined ? req.body.available === 'true' || req.body.available === true : true
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    room.roomName = req.body.roomName ?? room.roomName;
    room.roomType = req.body.roomType ?? room.roomType;
    room.price = req.body.price ?? room.price;
    room.description = req.body.description ?? room.description;
    room.facilities = req.body.facilities ? parseFacilities(req.body.facilities) : room.facilities;
    room.maxGuests = req.body.maxGuests ?? room.maxGuests;
    room.available = req.body.available !== undefined ? req.body.available === 'true' || req.body.available === true : room.available;
    if (req.file) {
      room.image = `/uploads/${req.file.filename}`;
    }

    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }
  res.json({ message: 'Room deleted successfully' });
};