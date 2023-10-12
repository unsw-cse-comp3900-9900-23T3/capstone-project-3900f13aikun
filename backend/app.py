from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import jwt
from functools import wraps
import random
import datetime
from email.message import EmailMessage
import ssl
import smtplib

app = Flask(__name__)

CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:jjy0325@localhost:5432/postgres' # replace by your username and password and 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



db = SQLAlchemy(app)
ma = Marshmallow(app)
app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with your actual secret key
passportlist = ['EH6727996','EH6727995','EH6727994','EH6727993','EH6727992']


class UserInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(50))
    email = db.Column(db.Text())
    password = db.Column(db.String(50))
    name = db.Column(db.String(50))

    def __init__(self, role, email, password, name):
        self.role = role
        self.email = email
        self.password = password
        self.name = name 
        
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'role','email','password','name')
        
class UserCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vcode = db.Column(db.Integer)
    email = db.Column(db.Text())
    
    def __init__(self,vcode,email):
        self. vcode =  vcode
        self.email = email

user_sc = UserSchema()
users_sc = UserSchema(many=True)






class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text())
    name = db.Column(db.String(50))
    workrights = db.Column(db.ARRAY(db.String), nullable=False)
    skill = db.Column(db.Text())
    uid = db.Column(db.Integer, db.ForeignKey('user_info.id'), nullable=False)
    avatarUrl = db.Column(db.Text())
    
    def __init__(self,email,name,workrights,skill,uid,avatarUrl):
        self.email =  email
        self.name = name
        self.workrights = workrights
        self.skill = skill
        self.uid = uid
        self.avatarUrl = avatarUrl


class ProfileSchema(ma.Schema):
    class Meta:
        fields = ('id', ' email','name',' workrights ','skill','uid','avatarUrl')
        
profile_sc = ProfileSchema()
profiles_sc = ProfileSchema(many=True)
        


#create table
with app.app_context():
    db.create_all()

#get user information according to the user id
@app.route('/getUserInfo/<id>', methods=['GET'])
def get_UserInfo(id):
    userInfo = UserInfo.query.get(id)
    results = user_sc.dump(userInfo)
    return jsonify(results)

#get user information according to the user id
@app.route('/getUserProfile/<id>', methods=['GET'])
def get_UserProfile(id):
    ProfileInfo = Profile.query.filter_by(uid=id).first()
    results = profile_sc.dump(ProfileInfo)
    return jsonify(results)

#send the code to frontend
@app.route('/sendcode', methods=['POST'])
def sendcode():
    code = ""
    email = request.json['email']
    for _ in range(4):
        digit = random.randint(0, 9)  
        code += str(digit)
    code = int(code)
    usercode = UserCode(code, email)
    db.session.add(usercode)
    db.session.commit()
    
    sender_email = 'iKun3900@gmail.com'
    sender_password = 'unfchthqfmcfdobc'

    receiver_email = email
    subject = 'code'
    body = str(code)

    email = EmailMessage()
    email['From'] = sender_email
    email['To'] = receiver_email
    email['subject'] = subject
    email.set_content(body)

    smtp = smtplib.SMTP('smtp.gmail.com', 587)
    smtp.starttls()
    smtp.login(sender_email, sender_password)
    smtp.sendmail(sender_email, receiver_email, email.as_string())

        
    return jsonify({'code': code})


#sign up function for system
@app.route('/register', methods=['POST'])
def regist():
    role = request.json['role']
    email = request.json['email']
    password = request.json['password']
    passport = request.json['passport']
    name = request.json['name']
    
    if passport not in passportlist:
         return jsonify({'error': 'Invalid passport'}), 400
     
    databaseEmail = UserInfo.query.filter_by(email=email).first()

    if databaseEmail:
        return jsonify({'error': 'This email has been registed'}), 400
    
    user = UserInfo(role,email,password,name)
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


@app.route('/resetpassword/sendcode', methods=['POST'])
def resetSend():
    email = request.json['email']
    userInfo = UserInfo.query.filter_by(email=email).first()
    userId = userInfo.id
    if not userInfo:
        return jsonify({'error': 'empty email or password'}), 400
    
    code = ""
    email = request.json['email']
    for _ in range(4):
        digit = random.randint(0, 9)  
        code += str(digit)
    code = int(code)
    sender_email = 'iKun3900@gmail.com'
    sender_password = 'unfchthqfmcfdobc'

    receiver_email = email
    subject = 'code'
    body = str(code)

    email = EmailMessage()
    email['From'] = sender_email
    email['To'] = receiver_email
    email['subject'] = subject
    email.set_content(body)

    smtp = smtplib.SMTP('smtp.gmail.com', 587)
    smtp.starttls()
    smtp.login(sender_email, sender_password)
    smtp.sendmail(sender_email, receiver_email, email.as_string())
    
    return jsonify({'code': code, 'userId': userId})


@app.route('/reset/<id>', methods=['PUT'])
def reset(id):
    password = request.json['password']
    userInfo = UserInfo.query.get(id)
    userInfo.password = password

    db.session.commit()
    return jsonify({'password':password})


#todo update profile according to the userid
@app.route('/updateprofile/<userid>', methods=['PUT'])
def updateprofile(userid):
    email = request.json['email']
    name = request.json['name']
    workright = request.json['workright']
    skill = request.json['skill']
    avatarUrl = request.json['avatarUrl']
    
    profileInfo = Profile.query.filter_by(uid=userid).first()
    userInfo = UserInfo.query.get(userid)
    if not profileInfo:
        profile = Profile(email,name, workright,skill, userid, avatarUrl)
        db.session.add(profile)
        db.session.commit()
    else:
        profileInfo.email = email
        profileInfo.name  =  name 
        profileInfo.workrights = workright
        profileInfo.skill = skill
        profileInfo.avatarUrl = avatarUrl
        userInfo.email = email
        userInfo.name  =  name 
        db.session.commit()

    return '1'





#todo store the project information to database according to the userid
@app.route('/projectdetail/<userid>/', methods=['POST'])
def storeproject(userid):
    pass





if __name__ == '__main__':
    app.run(debug=True)