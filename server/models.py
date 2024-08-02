from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    published_date = db.Column(db.DateTime, nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    link = db.Column(db.String(500), nullable=True)
    ratings = db.Column(db.Integer, nullable=True)
    tags = db.Column(db.String(200), nullable=True)