import { query } from '../config/db.js';
import { formatRoom, parseBoolean, serializeArray } from '../utils/mysqlFormatters.js';

export const getRooms = async (req, res) => {
  try {
    const [rows] = await query('SELECT id, roomName, roomType, price, description, facilities, maxGuests, image, available, created_at, updated_at FROM rooms ORDER BY created_at DESC');
    res.json(rows.map(formatRoom));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const [rows] = await query('SELECT id, roomName, roomType, price, description, facilities, maxGuests, image, available, created_at, updated_at FROM rooms WHERE id = ? LIMIT 1', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(formatRoom(rows[0]));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRoom = async (req, res) => {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    const available = parseBoolean(req.body.available, true);
    const price = Number(req.body.price);
    const maxGuests = Number(req.body.maxGuests || 1);

    if (!req.body.roomName || !req.body.roomType || !req.body.description || Number.isNaN(price) || price < 0 || Number.isNaN(maxGuests) || maxGuests < 1) {
      return res.status(400).json({ message: 'Room name, type, description, valid price, and valid max guests are required' });
    }

    const [result] = await query(
      'INSERT INTO rooms (roomName, roomType, price, description, facilities, maxGuests, image, available) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.body.roomName, req.body.roomType, price, req.body.description, serializeArray(req.body.facilities), maxGuests, image, available]
    );

    const [rows] = await query('SELECT id, roomName, roomType, price, description, facilities, maxGuests, image, available, created_at, updated_at FROM rooms WHERE id = ? LIMIT 1', [result.insertId]);
    if (rows.length === 0) {
      return res.status(500).json({ message: 'Room created but could not be loaded' });
    }

    res.status(201).json(formatRoom(rows[0]));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const [existingRows] = await query('SELECT id, roomName, roomType, price, description, facilities, maxGuests, image, available, created_at, updated_at FROM rooms WHERE id = ? LIMIT 1', [req.params.id]);

    if (existingRows.length === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const existingRoom = formatRoom(existingRows[0]);
    const updatedRoom = {
      roomName: req.body.roomName ?? existingRoom.roomName,
      roomType: req.body.roomType ?? existingRoom.roomType,
      price: req.body.price ?? existingRoom.price,
      description: req.body.description ?? existingRoom.description,
      facilities: req.body.facilities ? serializeArray(req.body.facilities) : serializeArray(existingRoom.facilities),
      maxGuests: req.body.maxGuests ?? existingRoom.maxGuests,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image ?? existingRoom.image,
      available: req.body.available !== undefined ? parseBoolean(req.body.available, existingRoom.available) : existingRoom.available
    };

    await query(
      'UPDATE rooms SET roomName = ?, roomType = ?, price = ?, description = ?, facilities = ?, maxGuests = ?, image = ?, available = ? WHERE id = ?',
      [updatedRoom.roomName, updatedRoom.roomType, updatedRoom.price, updatedRoom.description, updatedRoom.facilities, updatedRoom.maxGuests, updatedRoom.image, updatedRoom.available, req.params.id]
    );

    const [rows] = await query('SELECT id, roomName, roomType, price, description, facilities, maxGuests, image, available, created_at, updated_at FROM rooms WHERE id = ? LIMIT 1', [req.params.id]);
    if (rows.length === 0) {
      return res.status(500).json({ message: 'Room updated but could not be loaded' });
    }

    res.json(formatRoom(rows[0]));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const [result] = await query('DELETE FROM rooms WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
