from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from services.knowledge_service import KnowledgeService
from utils.decorators import validate_json, require_api_key

knowledge_bp = Blueprint('knowledge', __name__)
knowledge_service = KnowledgeService()

@knowledge_bp.route('/', methods=['GET'])
def get_knowledge_bases():
    """Get list of all knowledge bases"""
    try:
        knowledge_bases = knowledge_service.list_knowledge_bases()
        return jsonify({'success': True, 'data': knowledge_bases}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@knowledge_bp.route('/<kb_id>', methods=['GET'])
def get_knowledge_base(kb_id):
    """Get specific knowledge base by ID"""
    try:
        kb = knowledge_service.get_knowledge_base(kb_id)
        if kb:
            return jsonify({'success': True, 'data': kb}), 200
        else:
            return jsonify({'success': False, 'error': 'Knowledge base not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@knowledge_bp.route('/', methods=['POST'])
def create_knowledge_base():
    """Create a new knowledge base"""
    try:
        data = request.get_json()
        kb_name = data.get('name', '')
        kb_description = data.get('description', '')
        kb_type = data.get('type', 'vector')  # vector, graph, etc.
        
        if not kb_name:
            return jsonify({'success': False, 'error': 'Knowledge base name is required'}), 400
        
        kb = knowledge_service.create_knowledge_base(kb_name, kb_description, kb_type)
        return jsonify({'success': True, 'data': kb}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@knowledge_bp.route('/<kb_id>', methods=['PUT'])
def update_knowledge_base(kb_id):
    """Update a knowledge base"""
    try:
        data = request.get_json()
        kb = knowledge_service.update_knowledge_base(kb_id, data.get('name'), data.get('description'))
        if kb:
            return jsonify({'success': True, 'data': kb}), 200
        else:
            return jsonify({'success': False, 'error': 'Knowledge base not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@knowledge_bp.route('/<kb_id>', methods=['DELETE'])
def delete_knowledge_base(kb_id):
    """Delete a knowledge base"""
    try:
        success = knowledge_service.delete_knowledge_base(kb_id)
        if success:
            return jsonify({'success': True, 'message': 'Knowledge base deleted successfully'}), 200
        else:
            return jsonify({'success': False, 'error': 'Knowledge base not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@knowledge_bp.route('/<kb_id>/documents', methods=['GET'])
def get_documents(kb_id):
    """Get documents in a knowledge base"""
    try:
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        
        documents = knowledge_service.get_documents(kb_id, page, per_page)
        return jsonify({'success': True, 'data': documents}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@knowledge_bp.route('/<kb_id>/documents', methods=['POST'])
def add_document(kb_id):
    """Add a document to a knowledge base"""
    try:
        if 'file' not in request.files and 'content' not in request.form:
            return jsonify({'success': False, 'error': 'Either file or content is required'}), 400
        
        if 'file' in request.files:
            file = request.files['file']
            if file.filename == '':
                return jsonify({'success': False, 'error': 'No file selected'}), 400
            doc = knowledge_service.add_document_from_file(kb_id, file)
        else:
            content = request.form.get('content', '')
            title = request.form.get('title', '')
            doc = knowledge_service.add_document_from_content(kb_id, content, title)
        
        return jsonify({'success': True, 'data': doc}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@knowledge_bp.route('/<kb_id>/documents/<doc_id>', methods=['DELETE'])
def delete_document(kb_id, doc_id):
    """Delete a document from a knowledge base"""
    try:
        success = knowledge_service.delete_document(kb_id, doc_id)
        if success:
            return jsonify({'success': True, 'message': 'Document deleted successfully'}), 200
        else:
            return jsonify({'success': False, 'error': 'Document not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@knowledge_bp.route('/<kb_id>/query', methods=['POST'])
@validate_json(['query'])
def query_knowledge_base(kb_id):
    """Query a knowledge base"""
    try:
        data = request.get_json()
        query = data['query']
        top_k = data.get('top_k', 5)
        
        results = knowledge_service.query(kb_id, query, top_k)
        return jsonify({'success': True, 'data': results}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@knowledge_bp.route('/<kb_id>/process', methods=['POST'])
def process_knowledge_base(kb_id):
    """Process and index documents in a knowledge base"""
    try:
        result = knowledge_service.process_knowledge_base(kb_id)
        return jsonify({'success': True, 'data': result}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500