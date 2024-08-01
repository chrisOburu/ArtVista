from models import db, User
from flask import Flask, request
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from datetime import timedelta
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///artvista.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'secret-key'
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)

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
    
api.add_resource(Users, '/users')

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
    
api.add_resource(UsersByID, '/users/<int:id>')

if __name__ == '__main__':
    app.run(debug=True, port=5555, host='0.0.0.0')
