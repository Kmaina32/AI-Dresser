import { Pool } from 'pg';

let pool;

// This prevents creating a new connection pool on every hot-reload in development
if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}
pool = global._pgPool;

export default pool;