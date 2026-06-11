import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ocean-pearl-hotel-dev-secret');
    const [rows] = await query('SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1', [decoded.id]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }

    req.user = {
      id: rows[0].id,
      _id: String(rows[0].id),
      name: rows[0].name,
      email: rows[0].email,
      role: 'admin'
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({ message: 'Admin access required' });
};