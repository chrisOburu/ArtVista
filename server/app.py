<<<<<<< HEAD

from models import db, User,Review,Project

=======
from models import db, User, Review, Project
>>>>>>> 34aa3cd8a0587a96337ed1cb5786aa59ba1a6517
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
<<<<<<< HEAD

=======
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
>>>>>>> 34aa3cd8a0587a96337ed1cb5786aa59ba1a6517

app = Flask(__name__)

# Configure CORS
CORS(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'artvista.db')}")

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "your_secret_key"  # Change this to a strong secret key

migrate = Migrate(app, db)
db.init_app(app)
<<<<<<< HEAD



migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
=======
>>>>>>> 34aa3cd8a0587a96337ed1cb5786aa59ba1a6517
api = Api(app)
jwt = JWTManager(app)

<<<<<<< HEAD

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
    

 



=======
>>>>>>> 34aa3cd8a0587a96337ed1cb5786aa59ba1a6517
@app.route("/")
def index():
    return "<h1>Art Vista App</h1>"

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username=username).first()

<<<<<<< HEAD

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
        
=======
    if user and user.check_password(password):
>>>>>>> 34aa3cd8a0587a96337ed1cb5786aa59ba1a6517
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401

class Users(Resource):
    @jwt_required()
    def get(self):
        try:
            response_dict_list = [n.to_dict() for n in User.query.all()]
            return make_response(jsonify(response_dict_list), 200)
        except Exception as e:
            return make_response(jsonify({"errors": [str(e)]}), 400)

    def post(self):
        try:
            new_record = User(
                name=request.json["name"],
                username=request.json["username"],
                email=request.json["email"],
            )
            new_record.set_password(request.json["password"])
            db.session.add(new_record)
            db.session.commit()
            response = new_record.to_dict()
            return make_response(jsonify(response), 201)
        except Exception as e:
            return make_response(jsonify({"errors": [str(e)]}), 400)

class UserByID(Resource):
    @jwt_required()
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(jsonify(user.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "User not found"}), 404)

    @jwt_required()
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response(jsonify({"message": "User successfully deleted"}), 200)
        else:
            return make_response(jsonify({"error": "User not found"}), 404)

    @jwt_required()
    def put(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                user.name = request.json.get("name", user.name)
                user.username = request.json.get("username", user.username)
                user.email = request.json.get("email", user.email)
                db.session.commit()
                return make_response(jsonify(user.to_dict()), 200)
            except Exception as e:
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            return make_response(jsonify({"error": "User not found"}), 404)

    @jwt_required()
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                for key, value in request.json.items():
                    if hasattr(user, key):
                        setattr(user, key, value)
                db.session.commit()
                return make_response(jsonify(user.to_dict()), 200)
            except Exception as e:
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            return make_response(jsonify({"error": "User not found"}), 404)

class Projects(Resource):
    def get(self):
        response_dict_list = [n.to_dict() for n in Project.query.all()]
        return make_response(jsonify(response_dict_list), 200)
    
    @jwt_required()
    def post(self):
        try:
            new_record = Project(
                title=request.json["title"],
                description=request.json["description"],
                published_date=request.json.get("published_date", None),
                image_url=request.json.get("image_url", None),
                link=request.json.get("link", None),
                ratings=request.json.get("ratings", None),
                tags=request.json.get("tags", None)
            )
            db.session.add(new_record)
            db.session.commit()
            response = new_record.to_dict()
            return make_response(jsonify(response), 201)
        except Exception as e:
            return make_response(jsonify({"errors": [str(e)]}), 400)

class ProjectByID(Resource):
    def get(self, id):
        project = Project.query.filter_by(id=id).first()
        if project:
            return make_response(jsonify(project.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "Project not found"}), 404)

    @jwt_required()
    def delete(self, id):
        project = Project.query.filter_by(id=id).first()
        if project:
            db.session.delete(project)
            db.session.commit()
            return make_response(jsonify({"message": "Project successfully deleted"}), 200)
        else:
            return make_response(jsonify({"error": "Project not found"}), 404)

    @jwt_required()
    def put(self, id):
        project = Project.query.filter_by(id=id).first()
        if project:
            try:
                project.title = request.json.get("title", project.title)
                project.description = request.json.get("description", project.description)
                project.link = request.json.get("link", project.link)
                project.published_date = request.json.get("published_date", project.published_date)
                project.image_url = request.json.get("image_url", project.image_url)
                project.ratings = request.json.get("ratings", project.ratings)
                project.tags = request.json.get("tags", project.tags)
                
                db.session.commit()
                return make_response(jsonify(project.to_dict()), 200)
            except Exception as e:
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            return make_response(jsonify({"error": "Project not found"}), 404)

    @jwt_required()
    def patch(self, id):
        project = Project.query.filter_by(id=id).first()
        if project:
            try:
                for key, value in request.json.items():
                    if hasattr(project, key):
                        setattr(project, key, value)
                db.session.commit()
                return make_response(jsonify(project.to_dict()), 200)
            except Exception as e:
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            return make_response(jsonify({"error": "Project not found"}), 404)

class Reviews(Resource):
    def get(self):
        response_dict_list = [p.to_dict() for p in Review.query.all()]
        return make_response(jsonify(response_dict_list), 200)

    @jwt_required()
    def post(self):
        try:
            new_record = Review(
                date=request.json.get("date", None),
                comment=request.json["comment"],
                rating=request.json["rating"],
                user_id=request.json["user_id"],
                project_id=request.json["project_id"]
            )
            db.session.add(new_record)
            db.session.commit()
            response = new_record.to_dict()
            response['project'] = new_record.project.to_dict(only=('id', 'title'))
            response['user'] = new_record.user.to_dict(only=('id', 'username'))
            return make_response(jsonify(response), 201)
        except Exception as e:
            return make_response(jsonify({"errors": [str(e)]}), 400)

class ReviewByID(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            return make_response(jsonify(review.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "Review not found"}), 404)

    @jwt_required()
    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            db.session.delete(review)
            db.session.commit()
            return make_response(jsonify({"message": "Review successfully deleted"}), 200)
        else:
            return make_response(jsonify({"error": "Review not found"}), 404)

    @jwt_required()
    def put(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            try:
                review.comment = request.json.get("comment", review.comment)
                review.rating = request.json.get("rating", review.rating)
                review.user_id = request.json.get("user_id", review.user_id)
                review.project_id = request.json.get("project_id", review.project_id)
                db.session.commit()
                return make_response(jsonify(review.to_dict()), 200)
            except Exception as e:
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            return make_response(jsonify({"error": "Review not found"}), 404)

    @jwt_required()
    def patch(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            try:
                for key, value in request.json.items():
                    if hasattr(review, key):
                        setattr(review, key, value)
                db.session.commit()
                return make_response(jsonify(review.to_dict()), 200)
            except Exception as e:
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            return make_response(jsonify({"error": "Review not found"}), 404)

api.add_resource(Users, "/users")
api.add_resource(UserByID, "/users/<int:id>")
api.add_resource(Projects, "/projects")
api.add_resource(ProjectByID, "/projects/<int:id>")
api.add_resource(Reviews, "/reviews")
api.add_resource(ReviewByID, "/reviews/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)

