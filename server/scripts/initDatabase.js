import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';

const createTables = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INT AUTO_INCREMENT PRIMARY KEY,
      roomName VARCHAR(120) NOT NULL,
      roomType VARCHAR(80) NOT NULL,
      price DECIMAL(10, 2) NOT NULL DEFAULT 0,
      description TEXT,
      facilities TEXT,
      maxGuests INT NOT NULL DEFAULT 2,
      image TEXT,
      available TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customerName VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      phone VARCHAR(20),
      roomId INT NULL,
      roomType VARCHAR(100) NOT NULL,
      checkIn DATE NOT NULL,
      checkOut DATE NOT NULL,
      guests INT DEFAULT 1,
      specialRequest TEXT,
      status VARCHAR(20) DEFAULT 'Pending',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      phone VARCHAR(20),
      message TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(120) NOT NULL,
      image TEXT,
      category VARCHAR(80),
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
};

const seedAdmin = async () => {
  const email = 'admin@oceanpearlhotel.com';
  const [rows] = await query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);

  if (rows.length > 0) {
    return;
  }

  const password = await bcrypt.hash('admin123', 10);
  await query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    ['Ocean Pearl Admin', email, password]
  );
};

const seedRooms = async () => {
  const [rows] = await query('SELECT COUNT(*) AS total FROM rooms');

  if (Number(rows[0].total) > 0) {
    return;
  }

  const rooms = [
    ['Ocean Suite', 'Suite', 220, 'A spacious ocean-facing suite with a private balcony and golden sunset views.', JSON.stringify(['King Bed', 'Ocean View', 'Mini Bar', 'Wi-Fi']), 3, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', 1],
    ['Coral Deluxe', 'Deluxe', 180, 'Elegant and bright with luxury details inspired by the sea and sand.', JSON.stringify(['Queen Bed', 'Air Conditioning', 'Workspace', 'Ocean Breeze']), 2, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', 1],
    ['Pearl Family Room', 'Family', 260, 'Designed for relaxed family stays with extra space and calming coastal colors.', JSON.stringify(['2 Beds', 'Sofa Lounge', 'Kids Friendly', 'Breakfast']), 5, 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', 1]
  ];

  for (const room of rooms) {
    await query(
      'INSERT INTO rooms (roomName, roomType, price, description, facilities, maxGuests, image, available) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      room
    );
  }
};

const seedGallery = async () => {
  const [rows] = await query('SELECT COUNT(*) AS total FROM gallery');

  if (Number(rows[0].total) > 0) {
    return;
  }

  const items = [
    ['Sunrise Lobby', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', 'Interior'],
    ['Ocean Dining', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80', 'Dining'],
    ['Beach Lounge', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80', 'Exterior']
  ];

  for (const item of items) {
    await query('INSERT INTO gallery (title, image, category) VALUES (?, ?, ?)', item);
  }
};

await createTables();
await seedAdmin();
await seedRooms();
await seedGallery();

console.log('Database tables are ready');
process.exit(0);
