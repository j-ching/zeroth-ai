from dataclasses import dataclass
from datetime import datetime
from typing import Dict, Any, Optional

@dataclass
class Agent:
    id: str
    name: str
    config: Dict[str, Any]
    description: str
    created_at: datetime
    updated_at: datetime
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert the agent to a dictionary representation"""
        return {
            'id': self.id,
            'name': self.name,
            'config': self.config,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Agent':
        """Create an Agent instance from a dictionary"""
        return cls(
            id=data['id'],
            name=data['name'],
            config=data['config'],
            description=data.get('description', ''),
            created_at=datetime.fromisoformat(data['created_at']) if data.get('created_at') else datetime.utcnow(),
            updated_at=datetime.fromisoformat(data['updated_at']) if data.get('updated_at') else datetime.utcnow()
        )