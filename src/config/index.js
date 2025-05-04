import 'dotenv/config';
import logger from '../utils/logger';

// Server
export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT;
// Database
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
// WebSocket
export const WS_URL = process.env.WS_URL;
export const WS_INTERVAL = process.env.WS_INTERVAL || '15s';
export const WS_SYMBOL = process.env.WS_SYMBOL || 'BTCUSDT';
export const WS_STREAM = `${WS_SYMBOL}@kline_${WS_INTERVAL}`;

// --- check if all required environment variables are set ---
if (
   !PORT ||
   !DB_HOST ||
   !DB_PORT ||
   !DB_USER ||
   !DB_PASSWORD ||
   !DB_NAME ||
   !WS_URL ||
   !WS_INTERVAL ||
   !WS_SYMBOL ||
   !WS_STREAM
) {
   logger.error('Missing required environment variables');
   process.exit(1);
}

// --- export config ---
const config = {
   HOST,
   PORT,
   DB_HOST,
   DB_PORT,
   DB_USER,
   DB_PASSWORD,
   DB_NAME,
   WS_URL,
   WS_INTERVAL,
   WS_SYMBOL,
   WS_STREAM
};

export default config;



/*
// .env
HOST=localhost
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
WS_URL=wss://stream.binance.com:9443/ws/
WS_INTERVAL=15s
WS_SYMBOL=BTCUSDT
*/
