from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import re
from werkzeug.security import generate_password_hash, check_password_hash

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    published_date = db.Column(db.DateTime, nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    link = db.Column(db.String(500), nullable=True)
    ratings = db.Column(db.Integer, nullable=True)
    tags = db.Column(db.String(200), nullable=True)
    # Relationship- map review to related employee    
    review = db.relationship('reviews')


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(64), unique=True, nullable=False)
    user_role = db.Column(db.String(32), default="user", nullable=False)
    password = db.Column(db.String(128), nullable=False)
    active = db.Column(db.Boolean, default=True, nullable=False)
    # Relationship- map review to related employee    
    review = db.relationship('reviews')


    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    projects = association_proxy('reviews', 'project')
    owned_projects = db.relationship('Project', back_populates='owner')

    serialize_rules = (
        '-password', 
        '-reviews.user', 
        '-projects.users', 
        '-owned_projects.owner',
        '-owned_projects.reviews',
    )



    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Invalid email address")
        return email

    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 3 or len(username) > 20:
            raise ValueError("Username must be between 3 and 20 characters")
        if not re.match(r"^\w+$", username):
            raise ValueError("Username must contain only letters, numbers, and underscores")
        existing_user = db.session.query(User).filter_by(username=username).first()
        if existing_user:
            raise ValueError("Username already exists")
        return username

    def set_password(self, password):
        self.password = generate_password_hash(password)


class Review(db.Model):

    _tablename_ = 'reviews'



    id =db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    Rating = db.Column(db.Integer, nullable=False)
    Comment =db.Column(db.String(120), nullable=False)
    
    # Foreign key-store the employee id
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer,db.Foreignkey('projects.id'))
    # Relationship- map review to related employee
    user = db.relationship('User', back_populates="reviews")
    project = db.relationship('Projet', back_populates = " projects")

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f"<User {self.username}>"

class Project(db.Model, SerializerMixin):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    published_date = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    image_url = db.Column(db.String(500), nullable=True)
    link = db.Column(db.String(500), nullable=True)
    tags = db.Column(db.String(200), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    reviews = db.relationship('Review', back_populates='project', cascade='all, delete-orphan')
    users = association_proxy('reviews', 'user')
    owner = db.relationship('User', back_populates='owned_projects')

    @property
    def ratings(self):
        if self.reviews:
            return sum([review.rating for review in self.reviews]) / len(self.reviews)
        return None
    
    serialize_rules = (
        '-reviews.project', 
        '-users.projects', 
        '-owner.owned_projects',
        '-owner.reviews',
        '-users.reviews',
        'ratings',
    )

    @validates('owner_id')
    def validate_owner_id(self, key, owner_id):
        owner = db.session.query(User).get(owner_id)
        if owner is None:
            raise ValueError("Owner ID does not exist")
        return owner_id

    def __repr__(self):
        return f"<Project {self.title}>"


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(120), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    user = db.relationship('User', back_populates='reviews')
    project = db.relationship('Project', back_populates='reviews')

    serialize_rules = ('-user.reviews', '-project.reviews')

    @validates('user_id')
    def validate_user_id(self, key, user_id):
        user = db.session.query(User).get(user_id)
        if user is None:
            raise ValueError("User ID does not exist")
        return user_id

    @validates('project_id')
    def validate_project_id(self, key, project_id):
        project = db.session.query(Project).get(project_id)
        if project is None:
            raise ValueError("Project ID does not exist")
        return project_id

    @validates('rating')
    def validate_rating(self, key, rating):
        if rating < 1 or rating > 5:
            raise ValueError("Rating must be between 1 and 5")
        return rating

    def __repr__(self):
        return f"<Review {self.rating}>"


