// src/utils/config.js
import 'dotenv/config'; // loads .env → process.env
const arg = process.argv.slice(2)
   .find((a) => a.startsWith('--level='));

export const LOG_LEVEL = arg
   ? arg.split('=')[1]
   : process.env.LOG_LEVEL || 'info';

const config = {
   LOG_LEVEL
};

export default config;
