/**
 * simple logger utility
 * @module src/utils/logger
 *
 * @description
 * This module provides a simple logger utility that can be used to log messages to the console.
 * It supports different log levels and can be configured to log messages to a file or other destinations.
 *
 * @example
 * 1. setup
 * .env
 * LOG_LEVEL=warn
 * or
 * npm run dev -- --log-level=warn
 *
 * 2. use
 * import logger from './logger';
 * logger.debug('This is an debug message');
 *    // since log level = warn, -> debug message will NOT be logged
 *
 * 3. log level
 * error: only error messages will be logged
 * warn: error and warn messages will be logged
 * info: error, warn and info messages will be logged
 * debug: all messages will be logged
 */

import utilConfig from './config.js';
const LOG_LEVELS = ['error', 'warn', 'info', 'debug'];
const minIndex = LOG_LEVELS.indexOf(utilConfig.LOG_LEVEL);

function shouldLog(level) {
   return LOG_LEVELS.indexOf(level) <= minIndex;
}

const logger = {
   info: (message) => {
      if (!shouldLog('info')) return;

      const time = new Date()
         .toISOString();
      console.error(`[${time}] [INFO] ${message}`);
   },
   warn: (message) => {
      if (!shouldLog('warn')) return;

      const time = new Date()
         .toISOString();
      console.error(`[${time}] [WARN] ${message}`);
   },
   error: (message) => {
      if (!shouldLog('error')) return;

      const time = new Date()
         .toISOString();
      console.error(`[${time}] [ERROR] ${message}`);
   },
   debug: (message) => {
      if (!shouldLog('debug')) return;

      const time = new Date()
         .toISOString();
      console.error(`[${time}] [DEBUG] ${message}`);
   }
};

export default logger;
