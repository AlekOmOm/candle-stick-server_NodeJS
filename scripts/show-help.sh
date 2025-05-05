#!/bin/bash

# Define color codes
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
LIGTH_BLUE='\033[0;94m'
NC='\033[0m' # No Color

echo ""
echo -e "${CYAN}=== Candlestick Server Makefile Commands ===${NC}"
echo ""
echo -e "${GREEN}Database Commands:${NC}"
echo "  make run-db      - Build and run the PostgreSQL database container"
echo "  make stop-db     - Stop and remove the PostgreSQL container"
echo "  make clean-db    - Remove the PostgreSQL container and its data volume"
echo "  make setup-db    - Set up the database schema (run 'make run-db' first)"
echo ""
echo -e "${YELLOW}Testing Commands:${NC}"
echo "  make test-task1  - Run tests to verify Task 1 implementation"
echo ""
echo -e "${LIGTH_BLUE}Help:${NC}"
echo "  make help        - Display this help message"
echo "" 