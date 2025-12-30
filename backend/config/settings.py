import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'
    
    # Ray Configuration
    RAY_HEAD_ADDRESS = os.environ.get('RAY_HEAD_ADDRESS', 'localhost')
    RAY_HEAD_PORT = os.environ.get('RAY_HEAD_PORT', '10001')
    
    # Database Configuration (to be updated based on your choice)
    DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///ai_platform.db')
    
    # Model Configuration
    DEFAULT_MODEL_PATH = os.environ.get('DEFAULT_MODEL_PATH', './models')
    TRAINING_DATA_PATH = os.environ.get('TRAINING_DATA_PATH', './data/training')
    KNOWLEDGE_BASE_PATH = os.environ.get('KNOWLEDGE_BASE_PATH', './data/knowledge')
    
    # API Configuration
    API_VERSION = 'v1'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # Ray settings
    RAY_CLUSTER_CONFIG = {
        'num_cpus': int(os.environ.get('RAY_NUM_CPUS', 4)),
        'num_gpus': int(os.environ.get('RAY_NUM_GPUS', 0)),
        'memory': os.environ.get('RAY_MEMORY', '4GB'),
    }