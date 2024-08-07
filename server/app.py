from models import db, User, Review, Project
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required,get_jwt_identity
import os
import logging

app = Flask(__name__)

# Configure CORS
CORS(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'artvista.db')}")

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "your_secret_key")  # Load from env

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)
jwt = JWTManager(app)

# Setup logging
logging.basicConfig(filename=os.path.join(BASE_DIR, 'logs/artvista.log'),
                    level=logging.INFO,
                    format='%(asctime)s %(levelname)s: %(message)s')

# @app.before_request
# def log_request_info():
#     logging.info(f"Request: {request.method} {request.path} | IP: {request.remote_addr} | Payload: {request.json}")
#     #logging.info(f"Request: {request.method}")

# @app.after_request
# def log_response_info(response):
#     logging.info(f"Response: {response.status_code} {response.get_data(as_text=True)}")
#     #logging.info(f"Response: {response.status_code} ")
#     return response

@app.errorhandler(Exception)
def handle_exception(e):
    logging.error(f"Error: {str(e)}", exc_info=True)
    return jsonify({"error": "An unexpected error occurred"}), 500

@app.route("/")
def index():
    try:
        logging.info(f"Request: home route accessed")
        return "<h1>Art Vista App</h1>"
    except Exception as e:
        logging.error(f"Error: {str(e)}", exc_info=True)
        return jsonify({"error": "An unexpected error occurred"}), 500
    
@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        logging.info(f"User {user.id} logged in successfully.")
        return jsonify(access_token=access_token), 200
    else:
        logging.warning(f"Failed login attempt for username: {username}")
        return jsonify({"msg": "Bad username or password"}), 401
    
#register
@app.route("/register", methods=["POST"])
def register():
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
        logging.info(f"Created new user: {new_record.username}")
        return make_response(jsonify(response), 201)
    except Exception as e:
        logging.error(f"Error creating user: {str(e)}")
        return make_response(jsonify({"errors": [str(e)]}), 400)

class Users(Resource):
    @jwt_required()
    def get(self):
        try:
            response_dict_list = [n.to_dict() for n in User.query.all()]
            logging.info(f"Fetched all users.")
            return make_response(jsonify(response_dict_list), 200)
        except Exception as e:
            logging.error(f"Error fetching users: {str(e)}")
            return make_response(jsonify({"errors": [str(e)]}), 400)


class UserByID(Resource):
    @jwt_required()
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            logging.info(f"Fetched user with ID: {id}")
            return make_response(jsonify(user.to_dict()), 200)
        else:
            logging.warning(f"User with ID {id} not found.")
            return make_response(jsonify({"error": "User not found"}), 404)

    @jwt_required()
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            logging.info(f"Deleted user with ID: {id}")
            return make_response(jsonify({"message": "User successfully deleted"}), 200)
        else:
            logging.warning(f"User with ID {id} not found.")
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
                logging.info(f"Updated user with ID: {id}")
                return make_response(jsonify(user.to_dict()), 200)
            except Exception as e:
                logging.error(f"Error updating user with ID {id}: {str(e)}")
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            logging.warning(f"User with ID {id} not found.")
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
                logging.info(f"Partially updated user with ID: {id}")
                return make_response(jsonify(user.to_dict()), 200)
            except Exception as e:
                logging.error(f"Error partially updating user with ID {id}: {str(e)}")
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            logging.warning(f"User with ID {id} not found.")
            return make_response(jsonify({"error": "User not found"}), 404)

class Projects(Resource):
    def get(self):
        response_dict_list = [n.to_dict() for n in Project.query.all()]
        logging.info("Fetched all projects.")
        return make_response(jsonify(response_dict_list), 200)
    
    @jwt_required()
    def post(self):
        try:
            # Retrieve the user from the JWT token
            current_user_id = get_jwt_identity()
            
            new_record = Project(
                title=request.json["title"],
                description=request.json["description"],
                image_url=request.json.get("image_url", None),
                link=request.json.get("link", None),
                owner_id=current_user_id,
                tags=request.json.get("tags", None)
            )
            db.session.add(new_record)
            db.session.commit()
            response = new_record.to_dict()
            logging.info(f"User {current_user_id} created new project: {new_record.title}")
            return make_response(jsonify(response), 201)
        
        except KeyError as ke:
            logging.error(f"Missing key: {str(ke)}")
            return make_response(jsonify({"errors": [f"Missing key: {str(ke)}"]}), 400)
        
        except ValueError as ve:
            logging.error(f"Validation error: {str(ve)}")
            return make_response(jsonify({"errors": [str(ve)]}), 400)
        
        except Exception as e:
            logging.error(f"Error creating project: {str(e)}")
            return make_response(jsonify({"errors": [str(e)]}), 400)


class ProjectByID(Resource):
    @jwt_required()
    def put(self, id):
        current_user_id = get_jwt_identity()
        project = Project.query.filter_by(id=id).first()

        if project:
            if project.owner_id != current_user_id:
                logging.warning(f"User {current_user_id} attempted to modify project {id} without permission.")
                return make_response(jsonify({"error": "You do not have permission to modify this project"}), 403)

            try:
                project.title = request.json.get("title", project.title)
                project.description = request.json.get("description", project.description)
                project.link = request.json.get("link", project.link)
                project.published_date = request.json.get("published_date", project.published_date)
                project.image_url = request.json.get("image_url", project.image_url)
                project.ratings = request.json.get("ratings", project.ratings)
                project.tags = request.json.get("tags", project.tags)
                
                db.session.commit()
                logging.info(f"User {current_user_id} updated project with ID: {id}")
                return make_response(jsonify(project.to_dict()), 200)
            except Exception as e:
                logging.error(f"Error updating project with ID {id}: {str(e)}")
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            logging.warning(f"Project with ID {id} not found.")
            return make_response(jsonify({"error": "Project not found"}), 404)

    @jwt_required()
    def delete(self, id):
        current_user_id = get_jwt_identity()
        project = Project.query.filter_by(id=id).first()

        if project:
            if project.owner_id != current_user_id:
                logging.warning(f"User {current_user_id} attempted to delete project {id} without permission.")
                return make_response(jsonify({"error": "You do not have permission to delete this project"}), 403)

            db.session.delete(project)
            db.session.commit()
            logging.info(f"User {current_user_id} deleted project with ID: {id}")
            return make_response(jsonify({"message": "Project successfully deleted"}), 200)
        else:
            logging.warning(f"Project with ID {id} not found.")
            return make_response(jsonify({"error": "Project not found"}), 404)

    @jwt_required()
    def patch(self, id):
        current_user_id = get_jwt_identity()
        project = Project.query.filter_by(id=id).first()

        if project:
            if project.owner_id != current_user_id:
                logging.warning(f"User {current_user_id} attempted to modify project {id} without permission.")
                return make_response(jsonify({"error": "You do not have permission to modify this project"}), 403)

            try:
                for key, value in request.json.items():
                    if hasattr(project, key):
                        setattr(project, key, value)
                db.session.commit()
                logging.info(f"User {current_user_id} partially updated project with ID: {id}")
                return make_response(jsonify(project.to_dict()), 200)
            except Exception as e:
                logging.error(f"Error partially updating project with ID {id}: {str(e)}")
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            logging.warning(f"Project with ID {id} not found.")
            return make_response(jsonify({"error": "Project not found"}), 404)


class Reviews(Resource):
    def get(self):
        response_dict_list = [p.to_dict() for p in Review.query.all()]
        logging.info(f"Fetched all reviews.")
        return make_response(jsonify(response_dict_list), 200)

    @jwt_required()
    def post(self):
        try:
            current_user_id = get_jwt_identity()
            new_record = Review(
                date=request.json.get("date", None),
                comment=request.json["comment"],
                rating=request.json["rating"],
                user_id=current_user_id,
                project_id=request.json["project_id"]
            )
            db.session.add(new_record)
            db.session.commit()
            response = new_record.to_dict()
            response['project'] = new_record.project.to_dict(only=('id', 'title'))
            response['user'] = new_record.user.to_dict(only=('id', 'username'))
            logging.info(f"Created new review for project ID {new_record.project_id} by user ID {new_record.user_id}")
            return make_response(jsonify(response), 201)
        except Exception as e:
            logging.error(f"Error creating review: {str(e)}")
            return make_response(jsonify({"errors": [str(e)]}), 400)

class ReviewByID(Resource):
    @jwt_required()
    def put(self, id):
        current_user_id = get_jwt_identity()
        review = Review.query.filter_by(id=id).first()

        if review:
            if review.user_id != current_user_id:
                logging.warning(f"User {current_user_id} attempted to modify review {id} without permission.")
                return make_response(jsonify({"error": "You do not have permission to modify this review"}), 403)

            try:
                review.comment = request.json.get("comment", review.comment)
                review.rating = request.json.get("rating", review.rating)
                review.user_id = request.json.get("user_id", review.user_id)
                review.project_id = request.json.get("project_id", review.project_id)
                db.session.commit()
                logging.info(f"User {current_user_id} updated review with ID: {id}")
                return make_response(jsonify(review.to_dict()), 200)
            except Exception as e:
                logging.error(f"Error updating review with ID {id}: {str(e)}")
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            logging.warning(f"Review with ID {id} not found.")
            return make_response(jsonify({"error": "Review not found"}), 404)

    @jwt_required()
    def delete(self, id):
        current_user_id = get_jwt_identity()
        review = Review.query.filter_by(id=id).first()

        if review:
            if review.user_id != current_user_id:
                logging.warning(f"User {current_user_id} attempted to delete review {id} without permission.")
                return make_response(jsonify({"error": "You do not have permission to delete this review"}), 403)

            db.session.delete(review)
            db.session.commit()
            logging.info(f"User {current_user_id} deleted review with ID: {id}")
            return make_response(jsonify({"message": "Review successfully deleted"}), 200)
        else:
            logging.warning(f"Review with ID {id} not found.")
            return make_response(jsonify({"error": "Review not found"}), 404)

    @jwt_required()
    def patch(self, id):
        current_user_id = get_jwt_identity()
        review = Review.query.filter_by(id=id).first()

        if review:
            if review.user_id != current_user_id:
                logging.warning(f"User {current_user_id} attempted to modify review {id} without permission.")
                return make_response(jsonify({"error": "You do not have permission to modify this review"}), 403)

            try:
                for key, value in request.json.items():
                    if hasattr(review, key):
                        setattr(review, key, value)
                db.session.commit()
                logging.info(f"User {current_user_id} partially updated review with ID: {id}")
                return make_response(jsonify(review.to_dict()), 200)
            except Exception as e:
                logging.error(f"Error partially updating review with ID {id}: {str(e)}")
                return make_response(jsonify({"errors": [str(e)]}), 400)
        else:
            logging.warning(f"Review with ID {id} not found.")
            return make_response(jsonify({"error": "Review not found"}), 404)


api.add_resource(Users, "/users")
api.add_resource(UserByID, "/users/<int:id>")
api.add_resource(Projects, "/projects")
api.add_resource(ProjectByID, "/projects/<int:id>")
api.add_resource(Reviews, "/reviews")
api.add_resource(ReviewByID, "/reviews/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
