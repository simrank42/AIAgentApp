from fastapi import FastAPI, WebSocket, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.exceptions import RequestValidationError
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.middleware.base import BaseHTTPMiddleware
import logging
import os

from .core.config import settings
from .core.logging import setup_logging, security_logger
from .core.errors import (
    http_exception_handler, validation_exception_handler, 
    general_exception_handler, create_error_response
)
from .middleware.security_headers import SecurityHeadersMiddleware
from .middleware.request_validation import RequestValidationMiddleware
from .db.session import engine
from .db.base import Base
from .api.v1.auth import router as auth_router
from .api.v1.agents import router as agents_router
from .api.v1.sessions import router as sessions_router
from .api.v1.messages import router as messages_router
from .api.v1.users import router as users_router
from .api.v1.ws import router as ws_router
from .api.v1.csrf import router as csrf_router
from .api.v1.captcha import router as captcha_router
from .models.agent import Agent
from sqlalchemy.orm import Session, sessionmaker

# Setup logging
setup_logging()

app = FastAPI(
    title="AI Chat Backend", 
    version="0.1.0",
    docs_url="/docs" if settings.is_development else None,
    redoc_url="/redoc" if settings.is_development else None
)

# Add security middleware
if settings.ENABLE_SECURITY_HEADERS:
    app.add_middleware(SecurityHeadersMiddleware)

app.add_middleware(RequestValidationMiddleware)

# Add trusted host middleware in production
if settings.is_production:
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])

# Add CORS middleware
if settings.ENABLE_CORS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allow_headers=["Accept", "Accept-Language", "Content-Language", "Content-Type", "Authorization", "X-Requested-With"],
    )

# Add exception handlers
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, general_exception_handler)

# Routers
app.include_router(auth_router, prefix="/api/v1")
app.include_router(agents_router, prefix="/api/v1")
app.include_router(sessions_router, prefix="/api/v1")
app.include_router(messages_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")
app.include_router(ws_router, prefix="/api/v1")
app.include_router(csrf_router, prefix="/api/v1")
app.include_router(captcha_router, prefix="/api/v1")

@app.get("/health")
def health():
    return {"status": "ok"}

# Serve static files (Angular frontend)
static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")
    
    # SPA fallback: serve index.html for all non-API routes
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # If path starts with /api, return 404 (these should be handled by routers)
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="Not found")
        
        # Check if the requested file exists
        file_path = os.path.join(static_dir, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        
        # For all other routes, serve index.html (SPA fallback)
        index_path = os.path.join(static_dir, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)
        
        raise HTTPException(status_code=404, detail="Not found")

# Validate secrets on startup
@app.on_event("startup")
def validate_secrets():
    """Validate required secrets and log warnings"""
    logger = logging.getLogger(__name__)
    warnings = settings.validate_secrets(logger=logger)
    
    if warnings:
        logger.warning(f"🔍 Secret validation found {len(warnings)} warning(s) - check logs above")
        if settings.is_production:
            logger.info("💡 Tip: Set secrets in Render Dashboard → Your Service → Environment Variables")
    else:
        logger.info("✅ All required secrets configured")

# Seed agents on startup if empty
@app.on_event("startup")
def seed_agents():
    Base.metadata.create_all(bind=engine)  # ensure tables (also handled by Alembic)
    SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
    with SessionLocal() as db:
        if db.query(Agent).count() == 0:
            agents = [
                Agent(
                    key="general",
                    name="General Assistant",
                    description="""You are a helpful, friendly general-purpose AI assistant. You can help with:
- General questions and conversations
- Explanations and learning
- Advice and recommendations
- Problem-solving across various topics

If asked about specialized topics:
- For CODING questions → Suggest: "For detailed coding help, try our **Code Expert** agent!"
- For CREATIVE WRITING → Suggest: "For creative content, try our **Creative Writer** agent!"
- For DATA ANALYSIS → Suggest: "For data insights, try our **Data Analyst** agent!"

Always be helpful, clear, and friendly.""",
                    temperature=0.7,
                    model_id="hf",
                ),
                Agent(
                    key="coder",
                    name="Code Expert",
                    description="""You are an expert programming and coding assistant. Your ONLY focus is:
✅ Writing code (any programming language)
✅ Debugging and fixing code
✅ Explaining code concepts
✅ Code reviews and optimization
✅ Algorithm and data structure questions
✅ Technical implementation details

🚫 You MUST REFUSE non-coding questions politely:
If asked about general topics, creative writing, data analysis, or anything non-coding:

Respond: "I'm specialized in **coding and programming** only. For [topic] questions, please try one of our other agents:
- **General Assistant** - for general questions
- **Creative Writer** - for writing and content
- **Data Analyst** - for data and analytics

You can switch agents using the dropdown menu!"

Always provide clean, well-documented code with markdown formatting.""",
                    temperature=0.2,
                    model_id="hf",
                ),
                Agent(
                    key="creative",
                    name="Creative Writer",
                    description="""You are a creative writing assistant specialized in:
✅ Story writing and narratives
✅ Articles and blog posts
✅ Poetry and creative text
✅ Character development
✅ Plot ideas and brainstorming
✅ Content creation and copywriting

🚫 You MUST REFUSE non-creative questions:
If asked about coding, data analysis, or technical topics:

Respond: "I'm specialized in **creative writing** only. For [topic], please try:
- **Code Expert** - for programming help
- **Data Analyst** - for data questions
- **General Assistant** - for general topics

Switch agents using the dropdown menu above!"

Be imaginative, engaging, and use vivid language.""",
                    temperature=0.9,
                    model_id="hf",
                ),
                Agent(
                    key="analyst",
                    name="Data Analyst",
                    description="""You are a data analysis and analytical reasoning assistant focused on:
✅ Data interpretation and insights
✅ Statistical analysis
✅ Data visualization recommendations
✅ Analytical problem-solving
✅ Business intelligence questions
✅ Research and analysis

🚫 You MUST REFUSE questions outside your domain:
If asked about coding implementation, creative writing, or general topics:

Respond: "I'm specialized in **data analysis and analytics** only. For [topic], please try:
- **Code Expert** - for coding help
- **Creative Writer** - for creative content
- **General Assistant** - for general questions

You can switch agents from the menu!"

Provide logical, data-driven insights with clear reasoning.""",
                    temperature=0.4,
                    model_id="hf",
                ),
            ]
            db.add_all(agents)
            db.commit()
            print(f"✅ Seeded {len(agents)} agents successfully")
