# Binance Candlestick Data Server

A WebSocket-based server for ingesting Binance candlestick data into PostgreSQL/TimescaleDB.

## Project Overview

This project provides a Node.js application that connects to the Binance WebSocket API to receive real-time candlestick (kline) data and stores it in a PostgreSQL database with TimescaleDB extension. The implementation is divided into two phases:

1. **MVP**: Core functionality - connecting to Binance WebSocket, receiving and parsing data, and storing closed candlesticks for a single market.
2. **Phase 2**: Enhanced stability, resilience, multi-market support, and historical data backfilling.

## Features

### MVP
- Connect to Binance WebSocket stream for a single symbol/interval
- Parse incoming kline messages
- Store closed candlesticks in PostgreSQL/TimescaleDB
- Basic error handling and logging

### Phase 2
- Auto-reconnect with exponential backoff
- Support multiple symbols/intervals
- Improved error handling
- Graceful shutdown
- Database optimizations
- Historical data backfilling via REST API

## Technology Stack

- **Language/Runtime**: Node.js (LTS version)
- **WebSocket Client**: ws
- **Database**: PostgreSQL with TimescaleDB extension
- **PostgreSQL Driver**: pg (node-postgres)
- **Configuration**: dotenv
- **HTTP Client**: axios (for backfill)
- **Framework (Optional)**: Express.js

## Documentation

For detailed requirements and architecture, see the [PRD.txt](PRD.txt) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
