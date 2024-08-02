from models import db, Reviews
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
import os

app = Flask(__name__)


# Instantiate CORS
CORS(app) #  

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'artvista.db')}")

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

migrate = Migrate(app, db)
jwt = JWTManager()
db.init_app(app)

api = Api(app)

@app.route("/")
def index():
    return "<h1>Art Vista App</h1>"


#create a review
@app.route('/addreview', methods=['POST'])
def add_review():
    data = request.get_json()
    new_review = Reviews(date=data['date'], rating=data['rating'], comment = data['comment']) 
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'success': 'review created successfully'}), 201

# fetch all reviews
@app.route('/reviews', methods = ['GET'])
def reviews():
    reviews = Reviews.query.all()
    all_reviews = []
    for review in reviews:
        all_reviews.append({'id': review.id, 'date': review.date, 'rating': review.rating, 'comment': review.comment})
    return jsonify(all_reviews)

# fetch a review by its id
@app.route('/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Reviews.query.get_or_404(review_id)
    return jsonify({'id': review.id, 'date': review.date, 'rating': review.rating, 'comment': review.comment})
 
# update a review
@app.route('/reviews/<int:review_id>', methods=['PUT'])
def update_task(review_id):
    review = Reviews.query.get_or_404(review_id)
    data = request.get_json()

    review.date = data['date']
    review.rating = data.get('rating')
    review.comment = data.get('comment', review.comment)

    db.session.commit()
    return jsonify({'message': 'Review has been updated successfully'})

# delete a review
@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Reviews.query.get_or_404(review_id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted successfully'})


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

api.add_resource(Login, "/login")
api.add_resource(Register, "/register")

if __name__ == "__main__":
    app.run(port=5555, debug=True)

