import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { testConnection } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localEnvPath = path.resolve(__dirname, '.env');
const rootEnvPath = path.resolve(__dirname, '..', '.env');

if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}

if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath, override: true });
}

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = new Set([
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174'
]);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Ocean Pearl Hotel API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await testConnection();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the existing server or set a different PORT in .env.`);
      process.exit(1);
    }

    console.error(`Server failed: ${error.message}`);
    process.exit(1);
  });
};

startServer().catch((error) => {
  console.error(`Server startup failed: ${error.message}`);
  process.exit(1);
});
