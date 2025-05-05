import express from 'express';
const app = express();

import { config } from './src/config/index.js';
import logger from './src/utils/logger.js';

// --- middleware ---

async function startApp() {
   try {
      logger.info('Starting Binance Candlestick Data Server...');
      logger.info(`Configuration loaded for symbol: ${config.binance.symbol}, interval: ${config.binance.interval}`);
    
      logger.info('Application started. Ready to connect to Binance WebSocket and store data.');
   } catch (error) {
      logger.error('Error starting application:', error);
      process.exit(1);
   }
}


// --- server ---

app.listen(config.PORT, async () => {
   await startApp();
   logger.info(`Server is running on port ${config.PORT}`);
});

