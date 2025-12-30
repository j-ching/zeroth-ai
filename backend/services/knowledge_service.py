import os
import uuid
import json
import ray
from datetime import datetime
from typing import Dict, List, Optional
from models.knowledge import KnowledgeBase, Document
from config.settings import Config

class KnowledgeService:
    def __init__(self):
        # Initialize Ray for distributed knowledge processing
        if not ray.is_initialized():
            ray.init(ignore_reinit_error=True)
        
        # In a real implementation, this would connect to a database
        self.knowledge_bases = {}
        self.documents = {}  # {kb_id: [documents]}
        self.kb_dir = Config.KNOWLEDGE_BASE_PATH
        
        # Ensure knowledge base directory exists
        os.makedirs(self.kb_dir, exist_ok=True)
    
    def list_knowledge_bases(self) -> List[Dict]:
        """List all knowledge bases"""
        return [kb.to_dict() for kb in self.knowledge_bases.values()]
    
    def get_knowledge_base(self, kb_id: str) -> Optional[Dict]:
        """Get a specific knowledge base by ID"""
        kb = self.knowledge_bases.get(kb_id)
        return kb.to_dict() if kb else None
    
    def create_knowledge_base(self, name: str, description: str = "", kb_type: str = "vector") -> Dict:
        """Create a new knowledge base"""
        kb_id = str(uuid.uuid4())
        
        kb_dir = os.path.join(self.kb_dir, kb_id)
        os.makedirs(kb_dir, exist_ok=True)
        
        kb = KnowledgeBase(
            id=kb_id,
            name=name,
            description=description,
            type=kb_type,
            storage_path=kb_dir,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        self.knowledge_bases[kb_id] = kb
        self.documents[kb_id] = []  # Initialize documents list for this KB
        return kb.to_dict()
    
    def update_knowledge_base(self, kb_id: str, name: Optional[str] = None, 
                              description: Optional[str] = None) -> Optional[Dict]:
        """Update a knowledge base"""
        if kb_id not in self.knowledge_bases:
            return None
        
        kb = self.knowledge_bases[kb_id]
        if name is not None:
            kb.name = name
        if description is not None:
            kb.description = description
        kb.updated_at = datetime.utcnow()
        
        return kb.to_dict()
    
    def delete_knowledge_base(self, kb_id: str) -> bool:
        """Delete a knowledge base and all its documents"""
        if kb_id not in self.knowledge_bases:
            return False
        
        kb = self.knowledge_bases[kb_id]
        
        # Delete all documents in this KB
        for doc in self.documents.get(kb_id, []):
            try:
                if os.path.exists(doc.file_path):
                    os.remove(doc.file_path)
            except OSError:
                # Log the error but continue
                print(f"Warning: Could not delete document file at {doc.file_path}")
        
        # Delete the knowledge base directory
        try:
            import shutil
            shutil.rmtree(kb.storage_path)
        except OSError:
            # Log the error but continue
            print(f"Warning: Could not delete knowledge base directory at {kb.storage_path}")
        
        # Delete the knowledge base records
        del self.knowledge_bases[kb_id]
        if kb_id in self.documents:
            del self.documents[kb_id]
        
        return True
    
    def get_documents(self, kb_id: str, page: int = 1, per_page: int = 10) -> Dict:
        """Get documents in a knowledge base with pagination"""
        if kb_id not in self.documents:
            return {"documents": [], "total": 0, "page": page, "per_page": per_page}
        
        all_docs = self.documents[kb_id]
        total = len(all_docs)
        
        start_idx = (page - 1) * per_page
        end_idx = start_idx + per_page
        docs_page = all_docs[start_idx:end_idx]
        
        return {
            "documents": [doc.to_dict() for doc in docs_page],
            "total": total,
            "page": page,
            "per_page": per_page
        }
    
    def add_document_from_file(self, kb_id: str, file) -> Dict:
        """Add a document to a knowledge base from an uploaded file"""
        if kb_id not in self.knowledge_bases:
            raise ValueError(f"Knowledge base with ID {kb_id} not found")
        
        doc_id = str(uuid.uuid4())
        
        # Secure the filename
        filename = f"{doc_id}_{file.filename}"
        file_path = os.path.join(self.knowledge_bases[kb_id].storage_path, filename)
        
        # Save the file
        file.save(file_path)
        
        doc = Document(
            id=doc_id,
            kb_id=kb_id,
            title=file.filename,
            file_path=file_path,
            content="",  # Content will be extracted later
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        self.documents[kb_id].append(doc)
        return doc.to_dict()
    
    def add_document_from_content(self, kb_id: str, content: str, title: str = "") -> Dict:
        """Add a document to a knowledge base from content"""
        if kb_id not in self.knowledge_bases:
            raise ValueError(f"Knowledge base with ID {kb_id} not found")
        
        doc_id = str(uuid.uuid4())
        
        # If no title provided, create a default one
        if not title:
            title = f"Document_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}"
        
        # Save content to a file
        filename = f"{doc_id}_{title.replace(' ', '_')}.txt"
        file_path = os.path.join(self.knowledge_bases[kb_id].storage_path, filename)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        doc = Document(
            id=doc_id,
            kb_id=kb_id,
            title=title,
            file_path=file_path,
            content=content,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        self.documents[kb_id].append(doc)
        return doc.to_dict()
    
    def delete_document(self, kb_id: str, doc_id: str) -> bool:
        """Delete a document from a knowledge base"""
        if kb_id not in self.documents:
            return False
        
        docs = self.documents[kb_id]
        for i, doc in enumerate(docs):
            if doc.id == doc_id:
                # Delete the document file
                try:
                    if os.path.exists(doc.file_path):
                        os.remove(doc.file_path)
                except OSError:
                    # Log the error but continue
                    print(f"Warning: Could not delete document file at {doc.file_path}")
                
                # Remove from the list
                del docs[i]
                return True
        
        return False
    
    def query(self, kb_id: str, query: str, top_k: int = 5) -> Dict:
        """Query a knowledge base"""
        if kb_id not in self.knowledge_bases:
            raise ValueError(f"Knowledge base with ID {kb_id} not found")
        
        # In a real implementation, this would perform semantic search
        # For now, we'll simulate the search
        results = []
        for doc in self.documents.get(kb_id, []):
            # Simulated search result
            results.append({
                "document_id": doc.id,
                "title": doc.title,
                "content_preview": doc.content[:200] if doc.content else "No content available",
                "similarity_score": 0.8  # Simulated score
            })
        
        # Return top_k results
        results = results[:top_k]
        
        return {
            "query": query,
            "results": results,
            "total_results": len(results)
        }
    
    def process_knowledge_base(self, kb_id: str) -> Dict:
        """Process and index documents in a knowledge base"""
        if kb_id not in self.knowledge_bases:
            raise ValueError(f"Knowledge base with ID {kb_id} not found")
        
        # In a real implementation, this would use Ray to process documents
        # For now, we'll simulate the processing
        kb = self.knowledge_bases[kb_id]
        num_docs = len(self.documents.get(kb_id, []))
        
        processing_result = {
            "kb_id": kb_id,
            "kb_name": kb.name,
            "processed_documents": num_docs,
            "status": "completed",  # In real implementation, this would track actual status
            "processing_time": "3m",  # Simulated
            "timestamp": datetime.utcnow().isoformat()
        }
        
        return processing_result

# Ray remote functions for distributed knowledge processing
@ray.remote
def process_document_distributed(doc_path: str, kb_config: Dict):
    """
    Process a document in a distributed manner using Ray
    This function would run on Ray workers
    """
    # Implementation would depend on the specific processing needed
    # e.g., text extraction, embedding generation, etc.
    pass

@ray.remote
def query_knowledge_base_distributed(query: str, kb_config: Dict, top_k: int):
    """
    Query a knowledge base in a distributed manner using Ray
    This function would run on Ray workers
    """
    # Implementation would depend on the specific search method
    pass