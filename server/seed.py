from app import app, db
from models import User, Project, Review, Rating
from faker import Faker
import random
from decimal import Decimal

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

    # Define possible image URLs with folder path
    image_urls = [f'image{i}.jpg' for i in range(7)]

    live_link =[
        "https://www.theinspirationgrid.com",
        "https://www.deviantart.com",
        "https://www.dribbble.com",
        "https://www.medium.com",
        "https://www.producthunt.com",
        "https://www.coursera.org",
        "https://www.squarespace.com",
        "https://www.artstation.com",
        "https://www.codecademy.com",
        "https://www.hackerrank.com",
        "https://www.strava.com",
        "https://www.spotify.com",
        "https://www.soundcloud.com",
        "https://www.notion.so",
        "https://www.trello.com"
    ]


    # Create fake projects
    projects = []
    for _ in range(10):
        project = Project(
            title=faker.sentence(nb_words=4),
            description=faker.paragraph(nb_sentences=3),
            image_url=random.choice(image_urls),  # Randomly select from images/image0.jpg to images/image6.jpg
            link= random.choice(live_link),
            owner_id=random.choice(users).id,
            tags=", ".join(faker.words(nb=3))
        )
        projects.append(project)

    db.session.add_all(projects)
    db.session.commit()

    # Create fake reviews
    reviews = []
    for _ in range(20):
        review = Review(
            comment=faker.sentence(),
            user_id=random.choice(users).id,
            project_id=random.choice(projects).id
        )
        reviews.append(review)

    db.session.add_all(reviews)
    db.session.commit()

    # Create fake ratings
    ratings = []
    for _ in range(12):
        if not users or not projects:
            raise ValueError("No users or projects found in the database")
        
        rating = Rating(
            design_rating=round(random.uniform(1.0, 5.0), 1),
            usability_rating=round(random.uniform(1.0, 5.0), 1),
            functionality_rating=round(random.uniform(1.0, 5.0), 1),
            user_id=random.choice(users).id,
            project_id=random.choice(projects).id
        )
        ratings.append(rating)

    try:
        db.session.add_all(ratings)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"An error occurred: {e}")

print("Database seeded successfully with Faker!")