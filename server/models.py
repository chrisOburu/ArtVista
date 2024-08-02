from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    published_date = db.Column(db.DateTime, nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    link = db.Column(db.String(500), nullable=True)
    ratings = db.Column(db.Integer, nullable=True)
    tags = db.Column(db.String(200), nullable=True)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(64), unique=True, nullable=False)
    user_role = db.Column(db.String(32), default="user", nullable=False)
    password = db.Column(db.String(128), nullable=False)
    active = db.Column(db.Boolean, default=True, nullable=False)

    default_usernames = ['admin', 'user', 'root']


    serialize_rules = ('-password', )

    @staticmethod
    def validate_email(email):
        if '@' not in email or '.' not in email:
            return False
        return True
    
    @staticmethod
    def validate_username(username):
        if len(username) < 3 or len(username) > 32 or not username.isalnum() or username.lower() in User.default_usernames:
            return False
        return True


class Reviews(db.Model):
    id =db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    Rating = db.Column(db.Integer, nullable=False)
    Comment =db.Column(db.String(120), nullable=False)
    
