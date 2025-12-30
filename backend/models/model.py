from dataclasses import dataclass
from datetime import datetime
from typing import Dict, Any, Optional

@dataclass
class Model:
    id: str
    name: str
    description: str
    file_path: str
    version: str
    created_at: datetime
    updated_at: datetime
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert the model to a dictionary representation"""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'file_path': self.file_path,
            'version': self.version,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Model':
        """Create a Model instance from a dictionary"""
        return cls(
            id=data['id'],
            name=data['name'],
            description=data['description'],
            file_path=data['file_path'],
            version=data['version'],
            created_at=datetime.fromisoformat(data['created_at']) if data.get('created_at') else datetime.utcnow(),
            updated_at=datetime.fromisoformat(data['updated_at']) if data.get('updated_at') else datetime.utcnow()
        )