import shutil
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.api_models import IngestResponse
from app.services.ingestion_service import ingest_document

router = APIRouter()

@router.post("/ingest", response_model=IngestResponse)
async def ingest_file(file: UploadFile = File(...)):
    """
    Endpoint to upload and process a document.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file name provided.")
        
    upload_dir = Path("uploads")
    upload_dir.mkdir(exist_ok=True)
    file_path = upload_dir / Path(file.filename).name

    try:
        # Save the uploaded file temporarily
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Process the document
        node_count = ingest_document(file_path)

        return IngestResponse(
            message="Document ingested successfully.",
            filename=file.filename,
            node_count=node_count,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process file: {e}")
    finally:
        # Clean up the uploaded file
        if file_path.exists():
            file_path.unlink() 