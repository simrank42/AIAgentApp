from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from ..core.config import settings

# SQLite-specific configuration for Litestream compatibility
connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    # Enable WAL mode for Litestream compatibility
    connect_args = {
        "check_same_thread": False,
        "timeout": 30,  # Set timeout for database operations (increased for Litestream)
    }

# SQLite file DB (synchronous)
engine = create_engine(
    settings.DATABASE_URL,
    future=True,
    echo=False,
    connect_args=connect_args,
    pool_pre_ping=True,  # Verify connections before using
)

# Enable WAL mode for SQLite databases
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_conn, connection_record):
    if settings.DATABASE_URL.startswith("sqlite"):
        cursor = dbapi_conn.cursor()
        cursor.execute("PRAGMA journal_mode=WAL")
        cursor.execute("PRAGMA synchronous=NORMAL")
        # Increased busy_timeout to 15 seconds to handle Litestream sync operations
        cursor.execute("PRAGMA busy_timeout=15000")
        cursor.close()

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
