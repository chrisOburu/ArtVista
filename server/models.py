from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
#import re
db = SQLAlchemy()

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

class Reviews(db.Model):
    id =db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    Rating = db.Column(db.Integer, nullable=False)
    Comment =db.Column(db.String(120), nullable=False)
    




	
db = SQLAlchemy(metadata=metadata)