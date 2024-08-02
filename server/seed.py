from app import app, db
from models import Project
from datetime import datetime
from faker import Faker

# Create a Faker instance
fake = Faker()

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