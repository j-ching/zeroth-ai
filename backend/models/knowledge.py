from dataclasses import dataclass
from datetime import datetime
from typing import Dict, Any, Optional

@dataclass
class KnowledgeBase:
    id: str
    name: str
    description: str
    type: str  # vector, graph, etc.
    storage_path: str
    created_at: datetime
    updated_at: datetime
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert the knowledge base to a dictionary representation"""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'type': self.type,
            'storage_path': self.storage_path,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'KnowledgeBase':
        """Create a KnowledgeBase instance from a dictionary"""
        return cls(
            id=data['id'],
            name=data['name'],
            description=data['description'],
            type=data.get('type', 'vector'),
            storage_path=data['storage_path'],
            created_at=datetime.fromisoformat(data['created_at']) if data.get('created_at') else datetime.utcnow(),
            updated_at=datetime.fromisoformat(data['updated_at']) if data.get('updated_at') else datetime.utcnow()
        )

@dataclass
class Document:
    id: str
    kb_id: str
    title: str
    file_path: str
    content: str
    created_at: datetime
    updated_at: datetime
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert the document to a dictionary representation"""
        return {
            'id': self.id,
            'kb_id': self.kb_id,
            'title': self.title,
            'file_path': self.file_path,
            'content': self.content,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Document':
        """Create a Document instance from a dictionary"""
        return cls(
            id=data['id'],
            kb_id=data['kb_id'],
            title=data['title'],
            file_path=data['file_path'],
            content=data.get('content', ''),
            created_at=datetime.fromisoformat(data['created_at']) if data.get('created_at') else datetime.utcnow(),
            updated_at=datetime.fromisoformat(data['updated_at']) if data.get('updated_at') else datetime.utcnow()
        )