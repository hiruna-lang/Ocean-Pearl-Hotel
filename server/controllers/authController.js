import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { formatUser } from '../utils/mysqlFormatters.js';

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'ocean-pearl-hotel-dev-secret', { expiresIn: '7d' });

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const [existingUsers] = await query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    const [rows] = await query('SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1', [result.insertId]);

    if (rows.length === 0) {
      return res.status(500).json({ message: 'User created but could not be loaded' });
    }

    const user = formatUser(rows[0]);

    res.status(201).json({
      ...user,
      token: createToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const [rows] = await query('SELECT id, name, email, password, created_at FROM users WHERE email = ? LIMIT 1', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const userRow = rows[0];
    const passwordMatches = await bcrypt.compare(password, userRow.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = formatUser(userRow);

    res.json({
      ...user,
      token: createToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
