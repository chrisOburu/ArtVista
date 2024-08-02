from models import db, User,Reviews,Project
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from datetime import timedelta
from flask import Flask, request, make_response, jsonify
import os
from flask_restful import Api, Resource




app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'secret-key'
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'artvista.db')}")

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

migrate = Migrate(app, db)
jwt = JWTManager()
db.init_app(app)


db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
api = Api(app)
cors = CORS(app)
jwt = JWTManager(app)

class Users(Resource):
    def get(self):
        users = User.query.all()
        return {'users': [user.to_dict() for user in users]}, 200
    
    def post(self):
        try:
            data = request.get_json()
            if not User.validate_email(data['email']) or not data['password']:
                return {'info': 'Invalid email or password'}, 400
            
            if not User.validate_username(data['username']):
                return {'info': 'Invalid username'}, 400
            
            if User.query.filter_by(email=data['email']).first() or User.query.filter_by(username=data['username']).first():
                return {'info': 'Email or username already exists'}, 409
            
            hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            user = User(name=data['name'], username=data['username'], email=data['email'], password=hashed_password)
            db.session.add(user)
            db.session.commit()
            access_token = create_access_token(identity=user.id)
            return {
                'success': 'User created successfully',
                'access_token': access_token
                }, 201
        
        except Exception as e:
            return {'error': str(e)}, 500
    


class UsersByID(Resource):
    def get(self, id):
        user = User.query.get_or_404(id)
        return {'user': user.to_dict()}, 200
    
    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully!'}, 201
    
    def patch(self, id):
        user = User.query.get_or_404(id)
        if user:
            data = request.get_json()
            
            if 'name' in data:
                user.name = data['name']
            if 'username' in data:
                user.username = data['username']
            if 'email' in data:
                user.email = data['email']
            if 'user_role' in data:
                user.user_role = data['user_role']
            if 'active' in data:
                user.active = data['active']
            if 'password' in data:
                hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
                user.password = hashed_password
        
            db.session.commit()
            
            return {'message': 'User updated successfully'}, 202
        else:
            return {'error': 'User with id: {id} does not exist. Check the id and try again'}, 404
    

 



@app.route("/")
def index():
    return "<h1>Art Vista App</h1>"


#create a review
# routes for reviews
class Review(Resource):
#get all reviews
    def reviews(self):
        reviews = Review.query.all()
        all_reviews = []
        for review in reviews:
            all_reviews.append({'id': review.id, 'date': review.date, 'rating': review.rating, 'comment': review.comment})
        return jsonify(all_reviews)
class ReviewsById(Resource):    
# fetch a review by its id
    def get_review(self,id):
        review = Review.query.get_or_404(id)
        return jsonify({'id': review.id, 'date': review.date, 'rating': review.rating, 'comment': review.comment})

#update a review  
    def update_review(self,id):
        review = Review.query.get_or_404(id)
        data = request.get_json()

        review.date = data['date']
        review.rating = data.get('rating')
        review.comment = data.get('comment', review.comment)

        db.session.commit()
        return jsonify({'message': 'Review has been updated successfully'})

# delete a review
    def delete_review(self,id):
        review = Review.query.get_or_404(id)
        db.session.delete(review)

api.add_resource(Review, "/addreview")
api.add_resource(ReviewsById,"/reviews/<int:id>")

class Register(Resource):
    def post(Resource):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if User.query.filter_by(email=email).first():
            return jsonify({"message": "User already exists"}), 400
        
        user = User(username=username, email=email)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({"message": "User registered successfully"}), 201


class Login(Resource):
    def post(Resource):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        user = User.query.filter_by(email=email).first()
        
        if user is None or not user.check_password(password):
            return jsonify({"message": "Invalid credentials"}), 401
        
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token}), 200
    
class Projects(Resource):
    def get(self):
        projects = Project.query.all()
        return [
            {
                'id': project.id,
                'title': project.title,
                'description': project.description,
                'published_date': project.published_date,
                'image_url': project.image_url,
                'link': project.link,
                'ratings': project.ratings,
                'tags': project.tags
            } for project in projects
        ]

class ProjectByID(Resource):
    def get(self, project_id):
        project = Project.query.get(project_id)
        if project:
            return {
                'id': project.id,
                'title': project.title,
                'description': project.description,
                'published_date': project.published_date,
                'image_url': project.image_url,
                'link': project.link,
                'ratings': project.ratings,
                'tags': project.tags
            }
        return {'error': 'Project not found'}, 404

    def post(self):
        data = request.get_json()

        if not all(key in data for key in ('title', 'description', 'published_date', 'image_url', 'link', 'ratings', 'tags')):
            return {'error': 'Missing required fields'}, 400

        try:
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
            return {'message': 'New project created!'}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500

    def patch(self, project_id):
        data = request.get_json()
        project = Project.query.get(project_id)

        if not project:
            return {'error': 'Project not found'}, 404

        for key, value in data.items():
            if hasattr(project, key):
                setattr(project, key, value)
        
        try:
            db.session.commit()
            return {'message': 'Project updated successfully!'}
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500

    def delete(self, project_id):
        project = Project.query.get(project_id)

        if not project:
            return {'error': 'Project not found'}, 404

        try:
            db.session.delete(project)
            db.session.commit()
            return {'message': 'Project deleted successfully!'}
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500

api.add_resource(Projects, '/projects')
api.add_resource(ProjectByID, '/projects/<int:project_id>')
api.add_resource(Login, "/login")
api.add_resource(Register, "/register")
api.add_resource(Users, '/users')
api.add_resource(UsersByID, '/user/<int:id>')

if __name__ == "__main__":
    app.run(port=5555, debug=True)
