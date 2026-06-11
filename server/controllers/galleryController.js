import { query } from '../config/db.js';
import { formatGalleryItem } from '../utils/mysqlFormatters.js';

export const getGalleryItems = async (req, res) => {
  try {
    const [rows] = await query('SELECT id, title, image, category, created_at, updated_at FROM gallery ORDER BY created_at DESC');
    res.json(rows.map(formatGalleryItem));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    const [result] = await query(
      'INSERT INTO gallery (title, image, category) VALUES (?, ?, ?)',
      [req.body.title, image, req.body.category]
    );

    const [rows] = await query('SELECT id, title, image, category, created_at, updated_at FROM gallery WHERE id = ? LIMIT 1', [result.insertId]);
    if (rows.length === 0) {
      return res.status(500).json({ message: 'Gallery item created but could not be loaded' });
    }

    res.status(201).json(formatGalleryItem(rows[0]));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const [result] = await query('DELETE FROM gallery WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};