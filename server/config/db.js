import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localEnvPath = path.resolve(__dirname, '..', '.env');
const rootEnvPath = path.resolve(__dirname, '..', '..', '.env');

if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}

if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath, override: true });
}

const databaseName = process.env.DB_NAME || 'my_project_db';
let pool;
let poolReady;

const getBaseConfig = () => ({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: Number(process.env.DB_PORT || 3306)
});

const assertSafeDatabaseName = (name) => {
  if (!/^[A-Za-z0-9_$]+$/.test(name)) {
    throw new Error('DB_NAME may only contain letters, numbers, underscores, and dollar signs');
  }
};

const ensurePool = async () => {
  if (pool) {
    return pool;
  }

  if (!poolReady) {
    poolReady = (async () => {
      assertSafeDatabaseName(databaseName);

      const connection = await mysql.createConnection(getBaseConfig());
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
      await connection.end();

      pool = mysql.createPool({
        ...getBaseConfig(),
        database: databaseName,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      return pool;
    })();
  }

  return poolReady;
};

export const query = async (sql, params = []) => {
  const activePool = await ensurePool();
  return activePool.execute(sql, params);
};

export const testConnection = async () => {
  await query('SELECT 1');
  console.log(`MySQL connected successfully to ${databaseName}`);
};

const poolProxy = {
  execute: async (...args) => {
    const activePool = await ensurePool();
    return activePool.execute(...args);
  },
  query: async (...args) => {
    const activePool = await ensurePool();
    return activePool.query(...args);
  },
  getConnection: async (...args) => {
    const activePool = await ensurePool();
    return activePool.getConnection(...args);
  },
  end: async (...args) => {
    const activePool = await ensurePool();
    return activePool.end(...args);
  }
};

export default poolProxy;
