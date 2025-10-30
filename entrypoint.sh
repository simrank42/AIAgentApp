#!/bin/bash
set -e

echo "🚀 Starting application..."

# Database path - using /app/data (container filesystem, persisted via Litestream to R2)
DB_PATH="/app/data/app.db"
DB_DIR="/app/data"

# Function to handle graceful shutdown
cleanup() {
    echo "📤 Received shutdown signal, syncing Litestream..."
    litestream replicas sync "$DB_PATH" -config /app/litestream.yml || true
    echo "✅ Litestream sync complete"
    exit 0
}

# Set up signal handlers
trap cleanup SIGTERM SIGINT

# Ensure database directory exists (owned by appuser, no permission issues)
mkdir -p "$DB_DIR"
echo "✅ Database directory ready at $DB_DIR"

# Validate Litestream credentials before attempting to use them
LITESTREAM_ACCESS_KEY_ID="${LITESTREAM_ACCESS_KEY_ID:-}"
LITESTREAM_SECRET_ACCESS_KEY="${LITESTREAM_SECRET_ACCESS_KEY:-}"
LITESTREAM_BUCKET="${LITESTREAM_BUCKET:-}"
LITESTREAM_ENDPOINT="${LITESTREAM_ENDPOINT:-}"

if [ -n "$LITESTREAM_ACCESS_KEY_ID" ] && [ -n "$LITESTREAM_SECRET_ACCESS_KEY" ] && \
   [ -n "$LITESTREAM_BUCKET" ] && [ -n "$LITESTREAM_ENDPOINT" ]; then
    echo "✅ Litestream credentials configured"
    LITESTREAM_ENABLED=true
else
    echo "⚠️  Warning: Litestream credentials not configured"
    echo "📝 Continuing without database replication (set LITESTREAM_* env vars in Render Dashboard)"
    LITESTREAM_ENABLED=false
fi

# Check if database exists locally
if [ ! -f "$DB_PATH" ]; then
    echo "📦 Database not found locally, attempting to restore from Litestream..."
    
    # Attempt to restore from Litestream/R2 only if credentials are configured
    if [ "$LITESTREAM_ENABLED" = "true" ]; then
        if litestream restore -config /app/litestream.yml "$DB_PATH" 2>/dev/null; then
            echo "✅ Database restored from Litestream backup"
        else
            echo "⚠️  No backup found, starting with fresh database"
        fi
    else
        echo "⚠️  Litestream not configured - starting with fresh database"
    fi
else
    echo "✅ Database found locally"
fi

# Start Litestream replication in background only if credentials are configured
if [ "$LITESTREAM_ENABLED" = "true" ]; then
    echo "🔄 Starting Litestream replication..."
    litestream replicate "$DB_PATH" -config /app/litestream.yml &
    
    # Wait a moment for Litestream to initialize
    sleep 2
    
    # Check if Litestream started successfully
    if ! pgrep -x litestream > /dev/null; then
        echo "⚠️  Warning: Litestream may not have started correctly"
        echo "📝 Note: Continuing without replication (check credentials in Render Dashboard)"
    else
        echo "✅ Litestream replication started successfully"
    fi
else
    echo "⏭️  Skipping Litestream replication (credentials not configured)"
fi

# Run database migrations
echo "🔧 Running database migrations..."
alembic upgrade head

# Start the application
echo "🌐 Starting Uvicorn server..."
exec "$@"
