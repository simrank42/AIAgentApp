# BotBuddy

BotBuddy is an intelligent AI chat application that provides real-time conversational AI experiences through WebSocket streaming. The platform supports multiple AI providers and offers a secure, production-ready API with comprehensive authentication and data protection features.

**Live Application**: [https://botbuddy-x9k4.onrender.com/](https://botbuddy-x9k4.onrender.com/)

## Main Features

- **JWT Authentication**: Secure email/password authentication with access and refresh tokens
- **WebSocket Streaming**: Real-time AI chat with token-by-token streaming for responsive user experience
- **Agent System**: Pre-configured AI agents for different use cases (General, Coder, Security Analyst)
- **Session Management**: Persistent chat sessions with message history
- **Database Persistence**: SQLite database with Litestream replication to Cloudflare R2 for reliable data backup
- **RESTful API**: Comprehensive REST API for all application operations

## Security Features

- **Security Headers**: Content Security Policy (CSP), X-Frame-Options, X-Content-Type-Options, and more
- **CORS Protection**: Configurable Cross-Origin Resource Sharing with whitelist support
- **CSRF Protection**: Cross-Site Request Forgery tokens for state-changing operations
- **Rate Limiting**: Request rate limiting to prevent abuse and DDoS attacks
- **Password Security**: Argon2 password hashing with strong parameters
- **Input Validation**: Comprehensive validation to prevent SQL injection and XSS attacks
- **Request Validation**: Middleware-based request validation and sanitization
- **Secure Cookies**: HttpOnly, Secure, and SameSite cookie attributes for token storage
- **Trusted Host**: Host validation in production environments

## Prerequisites

- Python 3.11+
- Docker (optional, for containerized deployment)

## Local Development

### 1. Clone and Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -e .
```

### 3. Configure Environment

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` with your configuration. Minimum required settings:

```env
APP_ENV=dev
SECRET_KEY=your-secret-key-here-min-32-bytes
CORS_ORIGINS=http://localhost:4200
DATABASE_URL=sqlite:///./app.db
AI_PROVIDER=mock  # or 'huggingface' for real AI
```

For Hugging Face AI:
```env
AI_PROVIDER=huggingface
HF_TOKEN=your-huggingface-token
HF_MODEL=meta-llama/Llama-3.1-8B-Instruct
```

### 4. Initialize Database

```bash
alembic upgrade head
```

### 5. Run the Server

```bash
uvicorn app.main:app --reload --port 8000
```

The server will be available at: **http://localhost:8000**

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## Docker

Build and run with Docker:

```bash
docker build -t chat-backend .
docker run -p 8000:8000 --env-file .env chat-backend
```

## Environment Variables

Key configuration options:

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_ENV` | Environment (dev/prod) | `dev` |
| `SECRET_KEY` | Secret key for JWT (min 32 bytes) | Required |
| `DATABASE_URL` | SQLite database path | `sqlite:///./app.db` |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) | Required |
| `AI_PROVIDER` | AI provider: `mock`, `huggingface`, or `openai` | `mock` |
| `HF_TOKEN` | Hugging Face API token | Required if using Hugging Face |
| `HF_MODEL` | Hugging Face model name | `meta-llama/Llama-3.1-8B-Instruct` |

For production deployment with Litestream (database replication):
- `LITESTREAM_ACCESS_KEY_ID`
- `LITESTREAM_SECRET_ACCESS_KEY`
- `LITESTREAM_ENDPOINT`
- `LITESTREAM_BUCKET`

See `.env.example` for all available options.

## Project Structure

```
backend/
├── app/
│   ├── api/v1/      # API endpoints
│   ├── core/        # Configuration and utilities
│   ├── db/          # Database models and migrations
│   ├── models/      # SQLAlchemy models
│   ├── schemas/     # Pydantic schemas
│   ├── services/    # Business logic
│   └── main.py      # Application entry point
├── Dockerfile
├── alembic.ini
└── pyproject.toml
```
