# RAG Chatbot Backend

This project provides the backend services for a sophisticated RAG (Retrieval-Augmented Generation) chatbot. It's built with FastAPI and integrates with Qdrant for vector search, Neo4j for graph-based context, and Ollama for powering the Large Language Model (LLM).

## Architecture

The backend is designed based on the provided diagram, featuring a document ingestion pipeline and a query processing pipeline.

-   **Ingestion**: Documents are uploaded via an API endpoint. They are processed, chunked, and embedded. The resulting vectors are stored in Qdrant, and a knowledge graph is constructed and stored in Neo4j.
-   **Chat**: User queries are embedded and used to retrieve relevant context from both Qdrant (semantic similarity) and Neo4j (contextual relationships). This rich context is then passed to the LLM (Llama3 via Ollama) to generate a well-informed response.

## Prerequisites

-   [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose
-   [Python 3.10+](https://www.python.org/)
-   An Ollama installation with the `llama3` and `nomic-embed-text` models. You can pull them by running:
    ```bash
    ollama pull llama3
    ollama pull nomic-embed-text
    ```

## Setup & Running the Project

1.  **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd backend
    ```

2.  **Environment Variables**

    Create a `.env` file in the project root by copying the example content below. This file is ignored by git to protect your credentials.

    ```ini
    # .env file content

    # Qdrant configuration
    QDRANT_URL="http://localhost:6333"
    QDRANT_API_KEY=
    QDRANT_COLLECTION_NAME="rag-collection"

    # Neo4j configuration
    NEO4J_URI="bolt://localhost:7687"
    NEO4J_USERNAME="neo4j"
    NEO4J_PASSWORD="password"
    NEO4J_DATABASE="neo4j"

    # Ollama configuration
    OLLAMA_BASE_URL="http://localhost:11434"
    LLM_MODEL="llama3"
    EMBEDDING_MODEL="nomic-embed-text"

    # API Settings
    API_TITLE="RAG Chatbot API"
    API_VERSION="0.1.0"
    ```

3.  **Start Databases with Docker**

    I am providing a `docker-compose.yml` file to run the qdrant and neo4j instances. Create a file named `docker-compose.yml` in the project root and add the following content:
    
    ```yaml
    services:
      neo4j:
        image: neo4j:5
        container_name: neo4j_db
        ports:
          - "7474:7474"
          - "7687:7687"
        volumes:
          - neo4j_data:/data
        environment:
          - NEO4J_AUTH=neo4j/password
          - NEO4J_PLUGINS=["apoc"]
        healthcheck:
          test: ["CMD-SHELL", "wget -O /dev/null -q http://localhost:7474 || exit 1"]
          interval: 10s
          timeout: 5s
          retries: 5

      qdrant:
        image: qdrant/qdrant:latest
        container_name: qdrant_db
        ports:
          - "6333:6333"
          - "6334:6334"
        volumes:
          - qdrant_data:/qdrant/storage

    volumes:
      neo4j_data:
      qdrant_data:

    ```

    Then, start the services:

    ```bash
    docker-compose up -d
    ```

    You can access the Neo4j browser at `http://localhost:7474` and Qdrant UI at `http://localhost:6333/dashboard`.

4.  **Install Python Dependencies**

    Create a virtual environment and install the required packages.

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

5.  **Run the Backend Server**

    ```bash
    uvicorn app.main:app --reload
    ```

    The API documentation will be available at `http://localhost:8000/docs`.

## API Usage

### 1. Ingest Documents

Upload a document for processing and storage.

-   **Endpoint**: `POST /api/v1/ingest`
-   **Request**: `multipart/form-data` with a `file`.

**Example using `curl`:**

```bash
curl -X 'POST' \
  'http://localhost:8000/api/v1/ingest' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@/path/to/your/document.pdf'
```

### 2. Chat

Send a query and receive a response from the RAG pipeline.

-   **Endpoint**: `POST /api/v1/chat`
-   **Request Body**: JSON with a `query`.

**Example using `curl`:**

```bash
curl -X 'POST' \
  'http://localhost:8000/api/v1/chat' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "What is the main topic of the document?"
  }'
``` 