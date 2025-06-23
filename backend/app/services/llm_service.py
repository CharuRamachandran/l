from functools import lru_cache
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
from app.core.config import settings

@lru_cache
def get_llm():
    """
    Initializes and returns a cached instance of the Ollama LLM.
    """
    return Ollama(model=settings.llm_model, base_url=settings.ollama_base_url, request_timeout=120.0)

@lru_cache
def get_embedding_model():
    """
    Initializes and returns a cached instance of the Ollama embedding model.
    """
    return OllamaEmbedding(model_name=settings.embedding_model, base_url=settings.ollama_base_url) 