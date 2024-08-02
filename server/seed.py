
from app import app, db, User
from models import Project
from datetime import datetime
from faker import Faker
import random
from flask_bcrypt import Bcrypt

fake = Faker()
bcrypt = Bcrypt(app)




# Create the database and the database tables within the app context
with app.app_context():
    db.create_all()

    # Insert sample projects
    for _ in range(30):
        project = Project(
            title=fake.sentence(nb_words=4),
            description=fake.paragraph(nb_sentences=5),
            published_date=fake.date_time_this_year(),
            image_url=fake.image_url(),
            link=fake.url(),
            ratings=fake.random_int(min=1, max=5),
            tags=", ".join(fake.words(nb=3, unique=True))
        )
        db.session.add(project)

    db.session.commit()

print("Database seeded with sample data.")


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
