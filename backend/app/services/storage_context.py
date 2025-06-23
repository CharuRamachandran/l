import qdrant_client
from llama_index.core import StorageContext
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.graph_stores.neo4j import Neo4jGraphStore
from app.core.config import settings

def get_storage_context():
    """
    Initializes and returns the LlamaIndex StorageContext, which connects
    to the Qdrant vector store and Neo4j graph store.
    """
    # Initialize Qdrant client
    qdrant_client_instance = qdrant_client.QdrantClient(
        url=settings.qdrant_url, 
        api_key=settings.qdrant_api_key
    )

    # Initialize QdrantVectorStore
    vector_store = QdrantVectorStore(
        client=qdrant_client_instance, 
        collection_name=settings.qdrant_collection_name
    )

    # Initialize Neo4jGraphStore
    graph_store = Neo4jGraphStore(
        username=settings.neo4j_username,
        password=settings.neo4j_password,
        url=settings.neo4j_uri,
        database=settings.neo4j_database,
    )

    # Initialize StorageContext
    storage_context = StorageContext.from_defaults(
        vector_store=vector_store,
        graph_store=graph_store,
    )
    
    return storage_context 