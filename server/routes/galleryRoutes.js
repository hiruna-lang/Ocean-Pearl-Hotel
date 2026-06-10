import express from 'express';
import { createGalleryItem, deleteGalleryItem, getGalleryItems } from '../controllers/galleryController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getGalleryItems);
router.post('/', protect, adminOnly, upload.single('image'), createGalleryItem);
router.delete('/:id', protect, adminOnly, deleteGalleryItem);

export default router;