from pathlib import Path
from llama_index.core import SimpleDirectoryReader, KnowledgeGraphIndex, Settings as LlamaSettings
from app.services.llm_service import get_llm, get_embedding_model
from app.services.storage_context import get_storage_context

def ingest_document(file_path: Path) -> int:
    """
    Processes a single document, extracts information to build a knowledge graph
    and stores vector embeddings.

    Args:
        file_path (Path): The path to the document to ingest.

    Returns:
        int: The number of nodes added to the index.
    """
    # Load the document
    reader = SimpleDirectoryReader(input_files=[file_path])
    documents = reader.load_data()

    # Get storage, LLM, and embedding model
    storage_context = get_storage_context()
    llm = get_llm()
    embed_model = get_embedding_model()

    # Temporarily set the LlamaIndex settings
    original_llm = LlamaSettings.llm
    original_embed_model = LlamaSettings.embed_model
    LlamaSettings.llm = llm
    LlamaSettings.embed_model = embed_model

    try:
        # Create the KnowledgeGraphIndex
        # This will build the graph in Neo4j and store vectors in Qdrant
        index = KnowledgeGraphIndex.from_documents(
            documents,
            storage_context=storage_context,
            max_triplets_per_chunk=2,
            include_embeddings=True,
        )
        node_count = len(index.docstore.docs)
    finally:
        # Restore original settings
        LlamaSettings.llm = original_llm
        LlamaSettings.embed_model = original_embed_model

    return node_count 