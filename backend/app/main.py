from fastapi import FastAPI
from app.api.v1 import ingest, chat
from app.core.config import settings

app = FastAPI(
    title=settings.api_title,
    version=settings.api_version,
)

# Include API routers
app.include_router(ingest.router, prefix="/api/v1", tags=["Ingestion"])
app.include_router(chat.router, prefix="/api/v1", tags=["Chat"])

@app.get("/", tags=["Root"])
def read_root():
    """
    Root endpoint of the API.
    """
    return {"message": f"Welcome to the {settings.api_title}!"} 