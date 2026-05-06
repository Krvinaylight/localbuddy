from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
load_dotenv()  # loads .env file automatically
from config import Config
from models import db

bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.url_map.strict_slashes = False
    
    CORS(app, origins="*", supports_credentials=True)
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    
    with app.app_context():
        db.create_all()
        
    from routes.auth import auth_bp
    from routes.products import products_bp
    from routes.orders import orders_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')
    
    @app.route('/')
    def index():
        return {"message": "Welcome to Local Buddy API"}

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
