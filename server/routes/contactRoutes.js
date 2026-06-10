import express from 'express';
import { createContactMessage, deleteContactMessage, getContactMessages } from '../controllers/contactController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createContactMessage);
router.get('/', protect, adminOnly, getContactMessages);
router.delete('/:id', protect, adminOnly, deleteContactMessage);

export default router;