from app import create_app
from models import db, User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def create_admin():
    app = create_app()
    with app.app_context():
        # Check if admin already exists
        admin = User.query.filter_by(email='admin@localbuddy.com').first()
        if admin:
            print("Admin already exists!")
            return
        
        hashed_password = bcrypt.generate_password_hash('admin123').decode('utf-8')
        new_admin = User(
            name='Super Admin',
            email='admin@localbuddy.com',
            password_hash=hashed_password,
            is_admin=True
        )
        db.session.add(new_admin)
        db.session.commit()
        print("Admin user created: admin@localbuddy.com / admin123")

if __name__ == '__main__':
    create_admin()
