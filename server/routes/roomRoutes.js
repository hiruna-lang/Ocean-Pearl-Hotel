import express from 'express';
import { createRoom, deleteRoom, getRoomById, getRooms, updateRoom } from '../controllers/roomController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getRooms);
router.get('/:id', getRoomById);
router.post('/', protect, adminOnly, upload.single('image'), createRoom);
router.put('/:id', protect, adminOnly, upload.single('image'), updateRoom);
router.delete('/:id', protect, adminOnly, deleteRoom);

export default router;