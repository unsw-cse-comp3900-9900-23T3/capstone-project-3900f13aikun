from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import jwt
from functools import wraps
import random


import datetime

app = Flask(__name__)

CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:jjy0325@localhost:5432/postgres' # replace by your username and password and 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



db = SQLAlchemy(app)
ma = Marshmallow(app)
app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with your actual secret key

#test table 
class article_test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)
    
    
    def __init__(self, title, body):
        self.title = title
        self.body = body

#test data 
class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title','body','date')


article_schema1 = ArticleSchema()
article_schema2 = ArticleSchema(many= True)









class UserInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(50))
    email = db.Column(db.Text())
    password = db.Column(db.String(50))
    Passport = db.Column(db.String(100))
    DriverLicense = db.Column(db.String(100))
    MedicalCard =  db.Column(db.String(100))
    name = db.Column(db.String(50))

    def __init__(self, role, email, password, passport , DriverLicense, MedicalCard, name):
        self.role = role
        self.email = email
        self.password = password
        self.passport = passport
        self.DriverLicense = DriverLicense
        self.MedicalCard = MedicalCard
        self.name = name 
        
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'role','email','password','passport','DriverLicense', 'MedicalCard','name')
        

class UserCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vcode = db.Column(db.Integer)
    email = db.Column(db.Text())
    
    def __init__(self,  vcode,email):
        self. vcode =  vcode
        self.email = email


user_sc = UserSchema()
users_sc = UserSchema(many=True)

#create table
with app.app_context():
    db.create_all()


@app.route('/getUserInfo/<id>', methods=['GET'])
def get_UserInfo(id):
    userInfo = UserInfo.query.get(id)
    results = user_sc.dump(userInfo)
    return jsonify(results)

#test function
@app.route('/sendcode', methods=['POST'])
def sendcode():
    email = request.json['email']
    code = ""
    for _ in range(4):
        digit = random.randint(0, 9)  
        code += str(digit)
    code = int(code)
    usercode = UserCode(code, email)
    db.session.add(usercode)
    db.session.commit()
        
    return jsonify({'code': code})


#test function
@app.route('/get/<id>/', methods=['GET'])
def post_details(id):
    article = article_test.query.get(id)
    return article_schema1.jsonify(article)

#test function
@app.route('/update/<id>/', methods=['PUT'])
def update_article(id):
    article = article_test.query.get(id)
    
    title = request.json['title']
    body = request.json['body']
    article.title = title
    article.body = body
    db.session.commit()
    return article_schema1.jsonify(article)
#test function
@app.route('/delete/<id>/', methods=['DELETE'])
def delete_article(id):
    article = article_test.query.get(id)
    
    db.session.delete(article)
    db.session.commit()
    return article_schema1.jsonify(article)




#sign up function for system
@app.route('/register', methods=['POST'])
def regist():
    role = request.json['role']
    email = request.json['email']
    password = request.json['password']
    passport = request.json['passport']
    DriverLicense = request.json['driverLicense']
    MedicalCard = request.json['medicalCard']
    name = request.json['name']
    
    
    user = UserInfo(role,email,password,passport,DriverLicense, MedicalCard, name)
    db.session.add(user)
    db.session.commit()
    return user_sc.jsonify(user)


# def token_required(f):
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         auth_header = request.headers.get('Authorization')
#         if not auth_header or not auth_header.startswith('Bearer '):
#             return jsonify({'error': 'Missing or invalid token'}), 401

#         token = auth_header.split('Bearer ')[1]
        
#         try:
#             # Decode the token
#             decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             return jsonify({'error': 'Token has expired'}), 401
#         except jwt.InvalidTokenError:
#             return jsonify({'error': 'Invalid token'}), 401

#         return f(*args, **kwargs)

#     return decorated_function

#sign in function for system
@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    token = jwt.encode({'user_id': email}, app.config['SECRET_KEY'], algorithm='HS256')
    
    user = UserInfo.query.filter_by(email=email, password=password).first()
    user_data = user_sc.dump(user)
    usersend = {'token': str(token), 'user': user_data}
    
    if not email or not password:
        return jsonify({'error': 'empty email or password'}), 400

    if not user:
        return jsonify({'error': 'invalid email or password'}), 401

    return jsonify(usersend)





#todo store the project information to database according to the userid
@app.route('/projectdetail/<userid>/', methods=['POST'])
def storeproject(userid):
    pass

#todo store the profile information to database according to the userid
@app.route('/profiledetail/<userid>/', methods=['POST'])
def storeprofile(userid):
    pass

#todo get all project information according to the userid
@app.route('/getproject/<userid>/', methods=['GET'])
def getproject(userid):
    pass

#todo get profile according to the userid
@app.route('/getprofile/<userid>/', methods=['GET'])
def getprofile():
    pass

#todo update profile according to the userid
@app.route('/updateprofile/<userid>/', methods=['PUT'])
def updateprofile():
    pass


#todo reset password according to the userid
@app.route('/resetpassword/<userid>/', methods=['PUT'])
def reset():
    pass


if __name__ == '__main__':
    app.run(debug=True)
