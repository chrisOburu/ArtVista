from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

@app.route('/projects', methods=['POST'])
def create_project():
    from models import Project  # Import here to avoid circular import
    data = request.get_json()
    new_project = Project(
        title=data['title'], 
        description=data['description'], 
        published_date=data['published_date'], 
        image_url=data['image_url'], 
        link=data['link'], 
        ratings=data['ratings'], 
        tags=data['tags']
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify({'message': 'New project created!'})

if __name__ == '__main__':
    app.run(debug=True, port=5555)