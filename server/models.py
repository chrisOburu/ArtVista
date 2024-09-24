from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import re
from werkzeug.security import generate_password_hash, check_password_hash
from decimal import Decimal

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(64), unique=True, nullable=False)
    user_role = db.Column(db.String(32), default="user", nullable=False)
    password = db.Column(db.String(128), nullable=False)
    active = db.Column(db.Boolean, default=True, nullable=False)

    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    projects = db.relationship('Project', back_populates='user', cascade='all, delete-orphan')
    ratings = db.relationship('Rating', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = (
        '-password', 
        '-reviews',
        '-projects',
        '-ratings',
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
        return username

    def set_password(self, password):
        self.password = generate_password_hash(password)

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
    user = db.relationship('User', back_populates='projects')
    ratings = db.relationship('Rating', back_populates='project', cascade='all, delete-orphan')

    serialize_rules = (
        '-reviews.project',
        '-user.projects',
        '-ratings.project',
        'average_rating',
    )

    @property
    def average_rating(self):
        if self.ratings:
            total_rating = sum([rating.design_rating + rating.usability_rating + rating.functionality_rating for rating in self.ratings])
            count = len(self.ratings) * 3
            return total_rating / count
        return None

    @validates('owner_id')
    def validate_owner_id(self, key, owner_id):
        owner = db.session.query(User).get(owner_id)
        if owner is None:
            raise ValueError("Owner ID does not exist")
        return owner_id

    def __repr__(self):
        return f"<Project {self.title}>"

    def __str__(self):
        return self.title

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    comment = db.Column(db.String(120), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    user = db.relationship('User', back_populates='reviews')
    project = db.relationship('Project', back_populates='reviews')

    serialize_rules = ('-user.reviews', '-project.reviews',)

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

    def __repr__(self):
        return f"<Review {self.id}>"

    def __str__(self):
        return f"Review by User {self.user_id} on Project {self.project_id}"

class Rating(db.Model, SerializerMixin):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    design_rating = db.Column(db.Float, nullable=False)
    usability_rating = db.Column(db.Float, nullable=False)
    functionality_rating = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    user = db.relationship('User', back_populates='ratings')
    project = db.relationship('Project', back_populates='ratings')

    serialize_rules = ('-user.ratings', '-project.ratings')

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

    @validates('design_rating')
    def validate_design_rating(self, key, design_rating):
        if not isinstance(design_rating, (float, int)):
            raise ValueError("Design rating must be a float")
        if design_rating < 1.0 or design_rating > 5.0:
            raise ValueError("Design rating must be between 1 and 5")
        return design_rating

    @validates('usability_rating')
    def validate_usability_rating(self, key, usability_rating):
        if not isinstance(usability_rating, (float, int)):
            raise ValueError("Usability rating must be a float")
        if usability_rating < 1.0 or usability_rating > 5.0:
            raise ValueError("Usability rating must be between 1 and 5")
        return usability_rating

    @validates('functionality_rating')
    def validate_functionality_rating(self, key, functionality_rating):
        if not isinstance(functionality_rating, (float, int)):
            raise ValueError("Functionality rating must be a float")
        if functionality_rating < 1.0 or functionality_rating > 5.0:
            raise ValueError("Functionality rating must be between 1 and 5")
        return functionality_rating

    def to_dict(self):
        return {
            'design_rating': self.design_rating,
            'usability_rating': self.usability_rating,
            'functionality_rating': self.functionality_rating,
            'user_id': self.user_id,
            'project_id': self.project_id
        }
