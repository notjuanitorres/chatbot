from openai import OpenAI
from app.core.config import settings

_client: OpenAI | None = None

def get_openai_client() -> OpenAI:
    """Singleton OpenAI client instance."""
    global _client
    if _client is None:
        _client = OpenAI(api_key=settings.open_api_key)
    return _client