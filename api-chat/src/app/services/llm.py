from openai import OpenAI
from tenacity import retry, stop_after_attempt, wait_exponential
from app.core.config import settings

SYSTEM_PROMPT = "Sos un asistente de inteligencia artificial útil, claro y conciso. Respondé en español."

@retry(wait=wait_exponential(min=1, max=10), stop=stop_after_attempt(3))
def chat_completion(client: OpenAI, user_msg: str) -> str:
    resp = client.chat.completions.create(
        model=settings.openai_model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_msg},
        ],
        temperature=0.3,
    )

    return resp.choices[0].message.content or ""