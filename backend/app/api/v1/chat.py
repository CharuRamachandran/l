from fastapi import APIRouter, HTTPException
from app.models.api_models import ChatRequest, ChatResponse
from app.services.chat_service import query_rag

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Endpoint to handle chat queries.
    """
    try:
        response = query_rag(request.query)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process query: {e}") 