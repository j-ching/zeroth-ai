from functools import wraps
from flask import request, jsonify
import json

def validate_json(required_fields=None):
    """
    Decorator to validate JSON in request
    """
    if required_fields is None:
        required_fields = []
    
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not request.is_json:
                return jsonify({'success': False, 'error': 'Content-Type must be application/json'}), 400
            
            data = request.get_json()
            if data is None:
                return jsonify({'success': False, 'error': 'Invalid JSON'}), 400
            
            # Check for required fields
            for field in required_fields:
                if field not in data:
                    return jsonify({'success': False, 'error': f'Missing required field: {field}'}), 400
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def require_api_key(f):
    """
    Decorator to require API key for authentication
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # In a real implementation, this would validate the API key
        # For now, we'll just pass through
        api_key = request.headers.get('X-API-Key')
        if not api_key:
            # For development, we'll allow requests without API key
            # In production, uncomment the following lines:
            # return jsonify({'success': False, 'error': 'API key required'}), 401
            pass
        
        return f(*args, **kwargs)
    return decorated_function

def handle_exceptions(f):
    """
    Decorator to handle exceptions and return proper error responses
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    return decorated_function