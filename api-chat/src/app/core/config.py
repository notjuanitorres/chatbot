from typing import List
from pydantic import Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    open_api_key: str = Field(alias="OPENAI_API_KEY")
    openai_model: str = Field(alias="OPENAI_MODEL", default="gpt-4o-mini")
    api_allowed_origins: List[str] = Field(default_factory=lambda: ["*"], alias="API_ALLOWED_ORIGINS")
    env: str = Field(alias="ENV", default="development")

    model_config = {
        "case_sensitive": False,
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }

settings = Settings()
