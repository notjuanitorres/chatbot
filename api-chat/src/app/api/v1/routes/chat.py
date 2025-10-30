from fastapi import APIRouter, Depends, HTTPException
from app.schemas.chat import ChatIn, ChatOut
from app.deps import get_openai_client
from app.services.llm import chat_completion

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("", response_model=ChatOut)
async def chat(body: ChatIn, client = Depends(get_openai_client)):
    try:
        reply = chat_completion(client, body.message)
        return ChatOut(reply=reply)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"LLM error: {exc}")