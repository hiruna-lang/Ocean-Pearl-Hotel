import Gallery from '../models/Gallery.js';

export const getGalleryItems = async (req, res) => {
  const items = await Gallery.find().sort({ createdAt: -1 });
  res.json(items);
};

export const createGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.create({
      title: req.body.title,
      category: req.body.category,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Gallery item not found' });
  }
  res.json({ message: 'Gallery item deleted successfully' });
};