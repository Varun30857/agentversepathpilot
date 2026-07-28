import asyncio
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List

from services.groq_service import chat_with_assistant

router = APIRouter(
    prefix="/chat",
    tags=["Career Chat"],
)


class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    resume_context: Optional[dict] = None
    conversation_history: Optional[List[ChatMessage]] = []


@router.post("")
async def chat_endpoint(request: ChatRequest):
    """
    AI Career Chat Assistant — contextual chatbot with resume analysis as context.
    Helps users with career questions, resume improvement, and skill development.
    """
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Please provide a message.")

    history = [
        {"role": msg.role, "content": msg.content}
        for msg in (request.conversation_history or [])
    ]

    try:
        response = await asyncio.to_thread(
            chat_with_assistant,
            request.message.strip(),
            request.resume_context or {},
            history,
        )
        return {
            "status": "ok",
            "response": response,
            "message": "Career advice generated successfully.",
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Chat failed: {exc}")
