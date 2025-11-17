#!/bin/bash
set -e

echo "🚀 Starting application..."

# Database path - using /app/data (container filesystem, persisted via Litestream to R2)
DB_PATH="/app/data/app.db"
DB_DIR="/app/data"

# Function to handle graceful shutdown
cleanup() {
    echo "📤 Received shutdown signal..."
    # Only sync if Litestream is enabled and config exists
    if [ "${LITESTREAM_ENABLED:-false}" = "true" ] && [ -f /app/litestream.yml ]; then
        echo "🔄 Syncing Litestream..."
        export LITESTREAM_CONFIG=/app/litestream.yml
        litestream replicas sync "$DB_PATH" || true
        echo "✅ Litestream sync complete"
    else
        echo "⏭️  Skipping Litestream sync (not configured)"
    fi
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
    export LITESTREAM_ENABLED=true
    
    # Generate litestream.yml with environment variables substituted
    # Litestream doesn't support env var substitution in YAML, so we generate it dynamically
    echo "📝 Generating Litestream configuration..."
    cat > /app/litestream.yml <<EOF
# Litestream configuration for SQLite replication to Cloudflare R2
# Generated dynamically from environment variables

# Database configuration
dbs:
  - path: /app/data/app.db
    replicas:
      - type: s3
        bucket: ${LITESTREAM_BUCKET}
        path: app.db
        endpoint: ${LITESTREAM_ENDPOINT}
        access-key-id: ${LITESTREAM_ACCESS_KEY_ID}
        secret-access-key: ${LITESTREAM_SECRET_ACCESS_KEY}
        region: auto
        
        # Retention policy: keep last 7 days of snapshots
        retention: 7d
        
        # Sync interval: replicate changes every 1 hour (to reduce R2 costs)
        # Each sync counts as 1 Class A operation (\$4.50 per million)
        sync-interval: 1h
        
        # Checksums for data integrity
        checksum: true
        
        # WAL mode
        wal-mode: true
EOF
    echo "✅ Litestream configuration generated"
    # Set LITESTREAM_CONFIG environment variable so Litestream can find the config
    export LITESTREAM_CONFIG=/app/litestream.yml
else
    echo "⚠️  Warning: Litestream credentials not configured"
    echo "📝 Continuing without database replication (set LITESTREAM_* env vars in Render Dashboard)"
    export LITESTREAM_ENABLED=false
fi

# Check if database exists locally
if [ ! -f "$DB_PATH" ]; then
    echo "📦 Database not found locally, attempting to restore from Litestream..."
    
    # Attempt to restore from Litestream/R2 only if credentials are configured
    if [ "$LITESTREAM_ENABLED" = "true" ]; then
        if litestream restore -o "$DB_PATH" 2>/dev/null; then
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
    litestream replicate &
    
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
