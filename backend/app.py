from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Add the backend directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from api.agent_routes import agent_bp
from api.model_routes import model_bp
from api.knowledge_routes import knowledge_bp
from config.settings import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(agent_bp, url_prefix='/api/agents')
    app.register_blueprint(model_bp, url_prefix='/api/models')
    app.register_blueprint(knowledge_bp, url_prefix='/api/knowledge')
    
    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'AI Platform Backend is running'})
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)