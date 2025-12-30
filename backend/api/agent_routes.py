from flask import Blueprint, request, jsonify
from services.agent_service import AgentService
from utils.decorators import validate_json, require_api_key

agent_bp = Blueprint('agent', __name__)
agent_service = AgentService()

@agent_bp.route('/', methods=['GET'])
def get_agents():
    """Get list of all agents"""
    try:
        agents = agent_service.list_agents()
        return jsonify({'success': True, 'data': agents}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@agent_bp.route('/<agent_id>', methods=['GET'])
def get_agent(agent_id):
    """Get specific agent by ID"""
    try:
        agent = agent_service.get_agent(agent_id)
        if agent:
            return jsonify({'success': True, 'data': agent}), 200
        else:
            return jsonify({'success': False, 'error': 'Agent not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@agent_bp.route('/', methods=['POST'])
@validate_json(['name', 'config'])
def create_agent():
    """Create a new agent"""
    try:
        data = request.get_json()
        agent = agent_service.create_agent(data['name'], data['config'], data.get('description', ''))
        return jsonify({'success': True, 'data': agent}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@agent_bp.route('/<agent_id>', methods=['PUT'])
@validate_json(['config'])
def update_agent(agent_id):
    """Update an existing agent"""
    try:
        data = request.get_json()
        agent = agent_service.update_agent(agent_id, data['config'], data.get('description'))
        if agent:
            return jsonify({'success': True, 'data': agent}), 200
        else:
            return jsonify({'success': False, 'error': 'Agent not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@agent_bp.route('/<agent_id>', methods=['DELETE'])
def delete_agent(agent_id):
    """Delete an agent"""
    try:
        success = agent_service.delete_agent(agent_id)
        if success:
            return jsonify({'success': True, 'message': 'Agent deleted successfully'}), 200
        else:
            return jsonify({'success': False, 'error': 'Agent not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@agent_bp.route('/<agent_id>/preview', methods=['POST'])
def preview_agent(agent_id):
    """Preview agent with given input"""
    try:
        data = request.get_json()
        input_text = data.get('input', '')
        preview_result = agent_service.preview_agent(agent_id, input_text)
        return jsonify({'success': True, 'data': preview_result}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@agent_bp.route('/<agent_id>/run', methods=['POST'])
def run_agent(agent_id):
    """Execute an agent with given input"""
    try:
        data = request.get_json()
        input_text = data.get('input', '')
        result = agent_service.run_agent(agent_id, input_text)
        return jsonify({'success': True, 'data': result}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500