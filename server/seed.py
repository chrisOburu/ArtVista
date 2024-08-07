from app import app, db
from models import User, Project, Review
from faker import Faker
import random

# Initialize Faker
faker = Faker()

# Drop and recreate the database
with app.app_context():
    db.drop_all()
    db.create_all()

    # Create fake users
    users = []
    for _ in range(10):
        user = User(
            name=faker.name(),
            username=faker.user_name(),
            email=faker.email()
        )
        user.set_password(faker.password())
        users.append(user)

    db.session.add_all(users)
    db.session.commit()

    # Create fake projects
    projects = []
    for _ in range(10):
        project = Project(
            title=faker.sentence(nb_words=4),
            description=faker.paragraph(nb_sentences=3),
            image_url=faker.image_url(),
            link=faker.url(),
            owner_id=random.choice(users).id,
            tags=", ".join(faker.words(nb=3))
        )
        projects.append(project)

    db.session.add_all(projects)
    db.session.commit()

    # Create fake reviews with dates
    reviews = []
    for _ in range(20):
        review = Review(
            #date=faker.date_this_year(),
            comment=faker.sentence(),
            rating=random.randint(1, 5),
            user_id=random.choice(users).id,
            project_id=random.choice(projects).id
        )
        reviews.append(review)

    db.session.add_all(reviews)
    db.session.commit()

    print("Database seeded successfully with Faker!")
