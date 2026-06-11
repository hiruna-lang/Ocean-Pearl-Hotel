import { query } from '../config/db.js';
import { formatContactMessage } from '../utils/mysqlFormatters.js';

export const createContactMessage = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const [result] = await query(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [req.body.name, req.body.email, req.body.phone ?? '', req.body.message]
    );

    const [rows] = await query('SELECT id, name, email, phone, message, created_at, updated_at FROM contact_messages WHERE id = ? LIMIT 1', [result.insertId]);
    if (rows.length === 0) {
      return res.status(500).json({ message: 'Contact message created but could not be loaded' });
    }

    res.status(201).json(formatContactMessage(rows[0]));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const [rows] = await query('SELECT id, name, email, phone, message, created_at, updated_at FROM contact_messages ORDER BY created_at DESC');
    res.json(rows.map(formatContactMessage));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    const [result] = await query('DELETE FROM contact_messages WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
