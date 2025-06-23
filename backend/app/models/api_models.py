from pydantic import BaseModel

class IngestResponse(BaseModel):
    message: str
    filename: str
    node_count: int

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str
    sources: list[dict] 