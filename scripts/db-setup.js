// Database setup script for Candlestick Server
import pg from 'pg';
const { Pool } = pg;

import logger from '../src/utils/logger.js';

// Fallback configuration for testing
const config = {
  db: {
    user: 'postgres',
    host: 'localhost',
    database: 'candlestick_db',
    password: 'postgres',
    port: 5432,
  }
};


const createTableQuery = `
  CREATE TABLE IF NOT EXISTS candlesticks (
    timestamp TIMESTAMPTZ NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    interval VARCHAR(10) NOT NULL,
    open NUMERIC NOT NULL,
    high NUMERIC NOT NULL,
    low NUMERIC NOT NULL,
    close NUMERIC NOT NULL,
    volume NUMERIC NOT NULL,
    PRIMARY KEY (timestamp, symbol, interval)
  );
`;

async function setupDatabase() {
  const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
  });

  let client;
  try {
    logger.info('Connecting to database...');
    client = await pool.connect();
    logger.info('Database connected.');

    logger.info('Creating candlesticks table if it does not exist...');
    await client.query(createTableQuery);
    logger.info('Table "candlesticks" checked/created successfully.');

  } catch (err) {
    logger.error('Error setting up database:', err);
    process.exit(1); // Exit with error code
  } finally {
    if (client) {
      client.release();
      logger.info('Database client released.');
    }
    await pool.end();
    logger.info('Database pool ended.');
  }
}

setupDatabase(); 
