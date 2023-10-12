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
    pid = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), nullable=False)
    avatar_url = db.Column(db.String(255), nullable=False) 
    availability = db.Column(ARRAY(db.Integer), nullable=False)
    skill = db.Column(db.Text(), nullable=False)
  

    def __init__(self, name, email):
        self.uid = -1 # temp uid before registering
        self.name = name
        self.email = email
        self.avatar_url = 'https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png' # default avatar
        self.availability = []
        self.skill = ''


class ProfileSchema(ma.Schema):
    class Meta:
        fields = ('pid', 'uid', 'name', 'email', 'avatar_url', 'availability', 'skill')

profile_sc = ProfileSchema()
profiles_sc = ProfileSchema(many=True)


# ================================================


class ProjectSystem(db.Model):
    sid = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, nullable=False)
    pids = db.Column(ARRAY(db.Integer), nullable=False)
    permission = db.Column(ARRAY(db.Integer), nullable=False)

    def __init__(self):
        self.uid = -1 # temp uid before registering
        self.pids = []
        self.permissions = []


class ProjectSystemSchema(ma.Schema):
    class Meta:
        fields = ('sid', 'uid', 'pids', 'permission')

project_system_sc = ProjectSystemSchema()
project_systems_sc = ProjectSystemSchema(many=True)

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
    pid = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.Integer, nullable=False)
    job_classification = db.Column(db.Integer, nullable=False)
    problem_statement = db.Column(db.Text(), nullable=False)
    requirement = db.Column(db.Text(), nullable=False)
    payment_type = db.Column(db.Integer, nullable=False)

    desired_outcomes = db.Column(db.Text(), nullable=True)
    required_skill = db.Column(db.Text(), nullable=True)
    potential_deliverable = db.Column(db.Text(), nullable=True)
    expected_delivery_cycle = db.Column(db.Text(), nullable=True)


    def __init__(self, location, job_classification, problem_statement, requirement, payment_type):
        self.location = location
        self.job_classification = job_classification
        self.problem_statement = problem_statement
        self.requirement = requirement
        self.payment_type = payment_type



class ProjectSchema(ma.Schema):
    class Meta:
        fields = ('pid', 'location', 'job_classification', 'problem_statement', 'requirement', 'payment_type', 'desired_outcomes', 'required_skills', 'potential_eliverables', 'expected_delivery_cycle')

project_sc = ProjectSchema()
projects_sc = ProjectSchema(many=True)



# ================================================
#create table
with app.app_context():
    db.create_all()
# ================================================


########################################
#########         Auth        #########
########################################

#sign up function for system
@app.route('/register', methods=['POST'])
def regist():
    
    email = request.json['email']

    email_test =  User.query.filter_by(email=email).first()
    if email_test:
        return jsonify({'error': 'Email has been registered already'}), 401

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

    curr_user.profile_id = curr_user_profile.pid 
    curr_user.project_system_id = curr_user_project_system.sid

    curr_user_profile.uid = curr_user.uid

    curr_user_project_system.uid = curr_user.uid

    db.session.add(curr_user_profile)
    db.session.add(curr_user_project_system)
    db.session.add(curr_user)
    db.session.commit()

    return user_sc.jsonify(curr_user)



#sign in function for system
@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    if not email or not password:
        return jsonify({'error': 'empty email or password'}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user or user.passowrd != password:
        return jsonify({'error': 'invalid email or password'}), 401

    token = jwt.encode({'user_id': email}, app.config['SECRET_KEY'], algorithm='HS256')
    user_data = user_sc.dump(user)
    usersend = {'token': str(token), 'user': user_data}

    return jsonify(usersend)

########################################
#########        Project       #########
########################################
#todo store the project information to database according to the userid
@app.route('/project/create/<userid>/', methods=['POST'])
def storeproject(userid):
    input = request.get_json()

    location = input['location']
    job_classification = input['job_classification']
    problem_statement = input['problem_statement']
    requirement = input['requirement']

    payment_type = input['payment_type']

    curr_project = Project(location, job_classification, problem_statement, requirement, payment_type)

    if 'desired_outcomes' in input:
        curr_project.desired_outcomes = input['desired_outcomes']

    if 'required_skill' in input:
        curr_project.required_skill = input['required_skill']

    if 'potential_deliverable' in input:
        curr_project.potential_deliverable = input['potential_deliverable']

    if 'expected_delivery_cycle' in input:
        curr_project.expected_delivery_cycle = input['expected_delivery_cycle']

    db.session.add(curr_project)

    project_system = ProjectSystem.query.filter_by(uid=userid).first()

    project_system.pids.append(curr_project.id)
    project_system.permissions.append(1)

    db.session.commit()

    return project_sc.jsonify(curr_project)




#todo get all project information according to the userid
@app.route('/getproject/<userid>/', methods=['GET'])
def getproject(userid):
    curr_project_system = ProjectSystem.query.filter_by(uid=userid).first()

    curr_pids = curr_project_system.pids
    curr_permissions = curr_project_system.permissions

    post_project_ids = []
    for index in range(len(curr_permissions)):
        if curr_permissions[index] == 1:
            post_project_ids.append(curr_pids[index])
    
    post_projects = Project.query.filter(Project.pid.in_(post_project_ids)).all()

    return projects_sc.jsonify(post_projects)




########################################
#########        Profile       #########
########################################

#todo get profile according to the userid
@app.route('/profile/details/<userid>/', methods=['GET'])
def getprofile(userid):
    profile = Profile.query.filter_by(uid=userid).first()

    # if not profile :
    #     return jsonify({'error': 'user not exist'}), 400
    

    return profile_sc.jsonify(profile)

#todo update profile according to the userid
@app.route('/updateprofile/<userid>/', methods=['PUT'])
def updateprofilef1(userid):
    profile = Profile.query.filter_by(uid=userid).first()

    input = request.get_json()


    if 'name' in input:
        profile.name = input['name']

    if 'email' in input:
        profile.email = input['email']

    if 'avatar_url' in input:
        profile.avatar_url = input['avatar_url']

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
