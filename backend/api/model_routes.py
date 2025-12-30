from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
import os
from services.model_service import ModelService
from utils.decorators import validate_json, require_api_key

model_bp = Blueprint('model', __name__)
model_service = ModelService()

@model_bp.route('/', methods=['GET'])
def get_models():
    """Get list of all models"""
    try:
        models = model_service.list_models()
        return jsonify({'success': True, 'data': models}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@model_bp.route('/<model_id>', methods=['GET'])
def get_model(model_id):
    """Get specific model by ID"""
    try:
        model = model_service.get_model(model_id)
        if model:
            return jsonify({'success': True, 'data': model}), 200
        else:
            return jsonify({'success': False, 'error': 'Model not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@model_bp.route('/', methods=['POST'])
def upload_model():
    """Upload a new model file"""
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'success': False, 'error': 'No file selected'}), 400
            
        model_name = request.form.get('name', '')
        model_description = request.form.get('description', '')
        
        if not model_name:
            return jsonify({'success': False, 'error': 'Model name is required'}), 400
        
        model = model_service.upload_model(file, model_name, model_description)
        return jsonify({'success': True, 'data': model}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@model_bp.route('/<model_id>/download', methods=['GET'])
def download_model(model_id):
    """Download a model file"""
    try:
        model_path = model_service.get_model_path(model_id)
        if model_path and os.path.exists(model_path):
            return send_file(model_path, as_attachment=True)
        else:
            return jsonify({'success': False, 'error': 'Model not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@model_bp.route('/<model_id>', methods=['DELETE'])
def delete_model(model_id):
    """Delete a model"""
    try:
        success = model_service.delete_model(model_id)
        if success:
            return jsonify({'success': True, 'message': 'Model deleted successfully'}), 200
        else:
            return jsonify({'success': False, 'error': 'Model not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@model_bp.route('/<model_id>/train', methods=['POST'])
@validate_json(['training_data_path', 'epochs', 'learning_rate'])
def train_model(model_id):
    """Train a model with provided data"""
    try:
        data = request.get_json()
        training_result = model_service.train_model(
            model_id,
            data['training_data_path'],
            data['epochs'],
            data.get('learning_rate', 0.001),
            data.get('batch_size', 32)
        )
        return jsonify({'success': True, 'data': training_result}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@model_bp.route('/<model_id>/fine_tune', methods=['POST'])
@validate_json(['training_data_path', 'epochs'])
def fine_tune_model(model_id):
    """Fine-tune an existing model"""
    try:
        data = request.get_json()
        finetune_result = model_service.fine_tune_model(
            model_id,
            data['training_data_path'],
            data['epochs'],
            data.get('learning_rate', 0.0001)
        )
        return jsonify({'success': True, 'data': finetune_result}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@model_bp.route('/<model_id>/evaluate', methods=['POST'])
def evaluate_model(model_id):
    """Evaluate a model's performance"""
    try:
        data = request.get_json()
        evaluation_result = model_service.evaluate_model(
            model_id,
            data.get('test_data_path', ''),
            data.get('metrics', ['accuracy'])
        )
        return jsonify({'success': True, 'data': evaluation_result}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500