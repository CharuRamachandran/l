from llama_index.core import KnowledgeGraphIndex, Settings as LlamaSettings
from llama_index.core.query_engine import KnowledgeGraphQueryEngine
from app.services.llm_service import get_llm, get_embedding_model
from app.services.storage_context import get_storage_context
from app.models.api_models import ChatResponse

def query_rag(query: str) -> ChatResponse:
    """
    Handles a user query by leveraging the RAG pipeline.
    It queries the knowledge graph and vector store for context and then
    generates a response using the LLM.

    Args:
        query (str): The user's query.

    Returns:
        ChatResponse: The generated response and source nodes.
    """
    storage_context = get_storage_context()
    llm = get_llm()
    embed_model = get_embedding_model()

    # Temporarily set the LlamaIndex settings
    original_llm = LlamaSettings.llm
    original_embed_model = LlamaSettings.embed_model
    LlamaSettings.llm = llm
    LlamaSettings.embed_model = embed_model

    try:
        # Load the index from storage
        index = KnowledgeGraphIndex.from_existing(
            storage_context=storage_context,
            llm=llm,
        )

        # Create a query engine
        query_engine = index.as_query_engine(
            include_text=True,
            response_mode="tree_summarize",
            embedding_mode="hybrid",
            similarity_top_k=5,
        )

        # Query the engine
        response = query_engine.query(query)

        # Format the sources
        sources = [
            {"node_id": node.node_id, "text": node.get_content()}
            for node in response.source_nodes
        ]

    finally:
        # Restore original settings
        LlamaSettings.llm = original_llm
        LlamaSettings.embed_model = original_embed_model

    return ChatResponse(response=str(response), sources=sources) 