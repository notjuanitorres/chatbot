from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import configure_logging
from app.api.v1.routes import chat as chat_router

configure_logging()
app = FastAPI(title="API Chat with OpenAI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.api_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router.router, prefix="/api/v1")

@app.get("/health")
def health():
    return {"status": "ok"}