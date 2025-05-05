DB_CONTAINER_NAME=candlestick-db-container
DB_IMAGE_NAME=candlestick-db
DB_VOLUME_NAME=candlestick-db-data

.PHONY: help run-db stop-db clean-db setup-db test-task1

# Default target when running 'make' without arguments
.DEFAULT_GOAL := help

# Define color codes
GREEN = \033[0;32m
BLUE = \033[0;34m
CYAN = \033[0;36m
YELLOW = \033[0;33m
NC = \033[0m # No Color

# Target to display help information
help:
	@bash scripts/show-help.sh

# Target to build and run the PostgreSQL container
run-db:
	@echo "Building and running PostgreSQL container..."
	@docker build -t $(DB_IMAGE_NAME) ./db
	@echo "Running PostgreSQL container..."
	@docker run --name $(DB_CONTAINER_NAME) \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=postgres \
		-e POSTGRES_DB=candlestick_db \
		-p 5432:5432 \
		-v $(DB_VOLUME_NAME):/var/lib/postgresql/data \
		-d $(DB_IMAGE_NAME)
	@echo "PostgreSQL container '$(DB_CONTAINER_NAME)' started."

# Target to stop and remove the PostgreSQL container
stop-db:
	@echo "Stopping and removing PostgreSQL container '$(DB_CONTAINER_NAME)'..."
	@docker stop $(DB_CONTAINER_NAME) || echo "Container not running or already stopped."
	@docker rm $(DB_CONTAINER_NAME) || echo "Container not found or already removed."
	@echo "Container stopped and removed."

# Target to remove the PostgreSQL container and its volume
clean-db: stop-db
	@echo "Removing PostgreSQL data volume '$(DB_VOLUME_NAME)'..."
	@docker volume rm $(DB_VOLUME_NAME) || echo "Volume not found or already removed."
	@echo "Volume removed."

# Target to run the database setup script
# Assumes the database container is already running (run 'make run-db' first)
setup-db:
	@echo "Running database setup script..."
	@node scripts/db-setup.js
	@echo "Database setup script finished."

# Target to test if Task 1 is properly completed
test-task1:
	@echo "Testing Task 1 implementation..."
	@node scripts/verify-task001.js
