from models import db, User
from app import app
from faker import Faker
import random
from flask_bcrypt import Bcrypt

fake = Faker()
bcrypt = Bcrypt(app)

def delete_existing_data():
    try:
        User.query.delete()
        db.session.commit()
        print("Existing data deleted.")
    except Exception as e:
        db.session.rollback()
        print(f"An error occurred while deleting existing data: {e}")

        import traceback
        traceback.print_exc()

def seed_users():
    try:
        users = []
        for _ in range(5):
            hashed_password = bcrypt.generate_password_hash(fake.password()).decode('utf-8')
            user = User(
                name=fake.name(),
                user_role=random.choice(['user', 'admin','root']),
                username=fake.unique.user_name(),
                email=fake.unique.email(),
                password=hashed_password, 
                active=True
            )
            users.append(user)
        db.session.add_all(users)
        db.session.commit()
        print("Users seeded.")
        return users
    except Exception as e:
        db.session.rollback()
        print(f"An error occurred while seeding users: {e}")
        
        import traceback
        traceback.print_exc()
        return []

if __name__ == "__main__":
    with app.app_context():
        delete_existing_data()
        seed_users()
