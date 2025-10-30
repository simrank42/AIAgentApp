# AI Chat Backend

A production-ready FastAPI backend with WebSocket support, JWT authentication, and multiple AI provider integrations.

## 🚀 Quick Links

- **[Deploy to Render](DEPLOY_TO_RENDER.md)** - Complete deployment guide
- **[Security Documentation](SECURITY.md)** - Security features and best practices

## ✨ Features

- **Authentication**: Email/password signup & login with Argon2 password hashing
- **JWT Tokens**: Access tokens (15min) + Refresh tokens (7 days) with HttpOnly cookies
- **WebSocket Streaming**: Real-time AI chat with token-by-token streaming
- **Multiple AI Providers**: 
  - Mock (testing)
  - Hugging Face (free tier)
  - OpenAI (optional)
- **Database Persistence**: SQLite with Litestream replication to Cloudflare R2
- **Row-level Security**: User-level data isolation enforced
- **Agent System**: Pre-configured AI agents (General, Coder, Security Analyst)
- **Production Ready**: Rate limiting, CORS, security headers, CSRF protection

## 🛠️ Tech Stack

- Python 3.11+ · FastAPI · SQLAlchemy 2.x
- Alembic · Argon2 · JWT · WebSockets
- Litestream · Cloudflare R2
- Docker · Render

## 📦 Installation

### Prerequisites
- Python 3.11+
- Docker (optional)

### Local Development

1. Clone and navigate to backend:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -e .
```

4. Create `.env` file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Run database migrations:
```bash
alembic upgrade head
```

6. Start development server:
```bash
uvicorn app.main:app --reload --port 8000
```

Server runs at: http://localhost:8000

### Docker Development

```bash
cd backend
docker build -t chat-backend .
docker run -p 8000:8000 --env-file .env chat-backend
```

## 🌐 Production Deployment

See **[DEPLOY_TO_RENDER.md](DEPLOY_TO_RENDER.md)** for complete deployment instructions to Render with:
- Cloudflare R2 for database persistence
- Automatic backups
- Health checks
- Production security settings

## 📚 API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## 🔧 Configuration

### Environment Variables

Key configuration options in `.env`:

```env
# Application
APP_ENV=dev  # or 'prod'
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:4200

# Database
DATABASE_URL=sqlite:///./app.db

# AI Provider
AI_PROVIDER=huggingface  # or 'mock' or 'openai'
HF_TOKEN=your-huggingface-token
HF_MODEL=meta-llama/Llama-3.1-8B-Instruct

# Litestream (for production)
LITESTREAM_ACCESS_KEY_ID=your-r2-key
LITESTREAM_SECRET_ACCESS_KEY=your-r2-secret
LITESTREAM_BUCKET=your-bucket-name
LITESTREAM_ENDPOINT=https://your-account.r2.cloudflarestorage.com
```

See `.env.example` for all options.

## 🗂️ Project Structure

```
backend/
├── app/
│   ├── api/v1/          # API endpoints
│   ├── core/            # Core configuration
│   ├── db/              # Database & migrations
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas
│   ├── services/        # Business logic
│   └── main.py          # Application entry point
├── Dockerfile           # Container definition
├── render.yaml          # Render deployment config
├── litestream.yml       # Database replication config
└── pyproject.toml       # Dependencies

```

## 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app

# Check code quality
ruff check .
black --check .
```

## 📖 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.
