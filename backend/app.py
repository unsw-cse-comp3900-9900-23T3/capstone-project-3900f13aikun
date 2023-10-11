from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import jwt

from sqlalchemy import Sequence, MetaData, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY
import datetime
from sqlalchemy.orm import relationship

app = Flask(__name__)

CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/3900pro' # replace by your username and password and 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



db = SQLAlchemy(app)
ma = Marshmallow(app)
app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with your actual secret key






class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), nullable=False)
    avatar_url = db.Column(db.String(255), nullable=True) 
    availability = db.Column(ARRAY(db.Integer), nullable=False)
    skill = db.Column(db.Text(), nullable=False)
  

    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.avatar_url = 'https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png' # default avatar
        self.availability = []
        self.skill = ''


class ProfileSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'avatar_url', 'availability', 'skill')

profile_sc = ProfileSchema()
profiles_sc = ProfileSchema(many=True)







# ================================================


# ================================================


class ProjectSystem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pids = db.Column(ARRAY(db.Integer), nullable=False)

    def __init__(self):
        self.pids = []



class ProjectSystemSchema(ma.Schema):
    class Meta:
        fields = ('id', 'pids')

profile_sc = ProjectSystemSchema()
profiles_sc = ProjectSystemSchema(many=True)

# ================================================
class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)
    role = db.Column(db.Integer, nullable=False)
    profile_id = db.Column(db.Integer, ForeignKey('profile.id'), unique=True, nullable=True)
    project_system_id = db.Column(db.Integer, ForeignKey('project_system.id'), unique=True, nullable=True)

    profile = relationship('Profile', foreign_keys=[profile_id])
    project_system = relationship('ProjectSystem', foreign_keys=[project_system_id])


    def __init__(self, email, password, role):
        self.email = email
        self.password = password
        self.role = role


class UserSchema(ma.Schema):
    class Meta:
        fields = ('uid', 'email', 'password', 'role', 'profile_id', 'project_system_id')

user_sc = UserSchema()
users_sc = UserSchema(many=True)


# ================================================
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.Integer, nullable=False)
    job_classification = db.Column(db.Integer, nullable=False)
    problem_statement = db.Column(db.Text(), nullable=False)
    requirement = db.Column(db.Text(), nullable=False)
    payment_type = db.Column(db.Integer, nullable=False)

    desired_outcomes = db.Column(db.Text(), nullable=True)
    required_skills = db.Column(db.Text(), nullable=True)
    potential_eliverables = db.Column(db.Text(), nullable=True)
    expected_delivery_cycle = db.Column(db.Text(), nullable=True)


    def __init__(self, location, job_classification, problem_statement, requirement, payment_type):
        self.location = location
        self.job_classification = job_classification
        self.problem_statement = problem_statement
        self.requirement = requirement
        self.payment_type = payment_type



class ProjectSchema(ma.Schema):
    class Meta:
        fields = ('id', 'location', 'job_classification', 'problem_statement', 'requirement', 'payment_type', 'desired_outcomes', 'required_skills', 'potential_eliverables', 'expected_delivery_cycle')

project_sc = ProjectSchema()
project_sc = ProjectSchema(many=True)
# ================================================
#create table
with app.app_context():
    db.create_all()
# ================================================

#sign up function for system
@app.route('/register', methods=['POST'])
def regist():
    
    email = request.json['email']

    email_test =  User.query.filter_by(email=email).first()
    if email_test:
        return jsonify({'error': 'invalid email'}), 401

    name = request.json['name']
    password = request.json['password']
    role = request.json['role']

    if role == 'Student':
        role = 0
    elif role == 'Industry Partner':
        role = 1
    else:
        role = 2
    
    curr_user_profile = Profile(name, email)
    curr_user_project_system = ProjectSystem()
    curr_user = User(email, password, role)

    curr_user.profile_id = curr_user.uid 
    curr_user.project_system_id = curr_user.uid

    db.session.add(curr_user)
    db.session.add(curr_user_profile)
    db.session.add(curr_user_project_system)
    db.session.commit()


    return user_sc.jsonify(curr_user)



#sign in function for system
@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    token = jwt.encode({'user_id': email}, app.config['SECRET_KEY'], algorithm='HS256')
    
    user = User.query.filter_by(email=email, password=password).first()
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
@app.route('/profile/details/<userid>/', methods=['GET'])
def getprofile(userid):
    user_profile = Profile.query.get(id=userid).first()
    return profile_sc.jsonify(user_profile)

#todo update profile according to the userid
@app.route('/updateprofile/f1/<userid>/', methods=['PUT'])
def updateprofilef1(userid):
    profile = Profile.query.filter_by(uid=userid).first()

    input = request.get_json()


    if 'name' in input:
        profile.name = input['name']

    if 'email' in input:
        profile.email = input['email']

    if 'avatar_url' in input:
        profile.avatar_url = input['avatar_url']

    db.session.commit()

    return profile_sc.jsonify(profile)


#todo update profile according to the userid
@app.route('/updateprofile/f2/<userid>/', methods=['POST'])
def updateprofilef2(userid):
    profile = Profile.query.filter_by(uid=userid).first()

    input = request.get_json()


    if 'availability' in input:
        profile.availability = input['availability']

    if 'skill' in input:
        profile.skill = input['skill']

    db.session.commit()

    return profile_sc.jsonify(profile)


#todo reset password according to the userid
@app.route('/resetpassword/<userid>/', methods=['PUT'])
def reset(userid):
    user = User.query.filter_by(uid=userid).first()
    new_password = request.json['new_password']
    user.password = new_password

    db.session.commit()

    return user_sc.jsonify(user)



if __name__ == '__main__':
    app.run(debug=True)
