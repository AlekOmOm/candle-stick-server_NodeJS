FROM postgres:16-alpine

# Define arguments with defaults
ARG DB_USER=postgres
ARG DB_PASSWORD=postgres
ARG DB_NAME=candlestick_db
ARG DB_PORT=5432

# Set environment variables
ENV POSTGRES_USER=${DB_USER}
ENV POSTGRES_PASSWORD=${DB_PASSWORD}
ENV POSTGRES_DB=${DB_NAME}
ENV POSTGRES_PORT=${DB_PORT}

EXPOSE ${POSTGRES_PORT}

# Optional: Add initialization scripts if needed (e.g., schema creation)
# COPY init-db.sql /docker-entrypoint-initdb.d/
