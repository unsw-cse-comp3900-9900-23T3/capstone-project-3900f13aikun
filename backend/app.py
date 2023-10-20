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
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:jjy0325@localhost:5432/postgres' # replace by your username and password and
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://postgres:Yj042889@localhost:5432/postgres"  # replace by your username and password and

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app)
ma = Marshmallow(app)
app.config["SECRET_KEY"] = "your_secret_key"  # Replace with your actual secret key
passportlist = ["EH6727996", "EH6727995", "EH6727994", "EH6727993", "EH6727992"]


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
        fields = ("id", "role", "email", "password", "name")


class UserCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vcode = db.Column(db.Integer)
    email = db.Column(db.Text())

    def __init__(self, vcode, email):
        self.vcode = vcode
        self.email = email


user_sc = UserSchema()
users_sc = UserSchema(many=True)


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.Text())
    job_classification = db.Column(db.Integer)
    problem_statement = db.Column(db.Text())
    requirement = db.Column(db.Text())
    payment_type = db.Column(db.Integer)

    desired_outcomes = db.Column(db.Text())
    required_skill = db.Column(db.Text())
    potential_deliverable = db.Column(db.Text())
    expected_delivery_cycle = db.Column(db.Text())
    user_id = db.Column(db.ForeignKey(UserInfo.id))
    user = db.relationship(
        "UserInfo",
        primaryjoin="UserInfo.id == Project.user_id",
        lazy=True,
    )

    def __init__(
        self, location, job_classification, problem_statement, requirement, payment_type
    ):
        self.location = location
        self.job_classification = job_classification
        self.problem_statement = problem_statement
        self.requirement = requirement
        self.payment_type = payment_type


class ProjectSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "location",
            "job_classification",
            "problem_statement",
            "requirement",
            "payment_type",
            "desired_outcomes",
            "required_skills",
            "potential_eliverables",
            "expected_delivery_cycle",
        )


project_sc = ProjectSchema()
projects_sc = ProjectSchema(many=True)


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text())
    name = db.Column(db.String(50))
    workrights = db.Column(db.ARRAY(db.String), nullable=False)
    skill = db.Column(db.Text())
    uid = db.Column(db.Integer, db.ForeignKey("user_info.id"), nullable=False)
    avatarUrl = db.Column(db.Text())

    def __init__(self, email, name, workrights, skill, uid, avatarUrl):
        self.email = email
        self.name = name
        self.workrights = workrights
        self.skill = skill
        self.uid = uid
        self.avatarUrl = avatarUrl


class ProfileSchema(ma.Schema):
    class Meta:
        fields = ("id", " email", "name", " workrights ", "skill", "uid", "avatarUrl")


profile_sc = ProfileSchema()
profiles_sc = ProfileSchema(many=True)

# create table
with app.app_context():
    db.create_all()


# get user information according to the user id
@app.route("/getUserInfo/<id>", methods=["GET"])
def get_UserInfo(id):
    userInfo = UserInfo.query.get(id)
    results = user_sc.dump(userInfo)
    return jsonify(results)

# send the code to frontend
@app.route("/sendcode", methods=["POST"])
def sendcode():
    code = ""
    email = request.json["email"]
    for _ in range(4):
        digit = random.randint(0, 9)
        code += str(digit)
    code = int(code)
    usercode = UserCode(code, email)
    db.session.add(usercode)
    db.session.commit()

    sender_email = "iKun3900@gmail.com"
    sender_password = "unfchthqfmcfdobc"

    receiver_email = email
    subject = "code"
    body = str(code)

    email = EmailMessage()
    email["From"] = sender_email
    email["To"] = receiver_email
    email["subject"] = subject
    email.set_content(body)

    smtp = smtplib.SMTP("smtp.gmail.com", 587)
    smtp.starttls()
    smtp.login(sender_email, sender_password)
    smtp.sendmail(sender_email, receiver_email, email.as_string())

    return jsonify({"code": code})


# sign up function for system
@app.route("/register", methods=["POST"])
def regist():
    role = request.json["role"]
    email = request.json["email"]
    password = request.json["password"]
    passport = request.json["passport"]
    name = request.json["name"]

    if passport not in passportlist:
        return jsonify({"error": "Invalid passport"}), 400

    databaseEmail = UserInfo.query.filter_by(email=email).first()

    if databaseEmail:
        return jsonify({"error": "This email has been registed"}), 400

    user = UserInfo(role, email, password, name)
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


# sign in function for system
@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]
    token = jwt.encode({"user_id": email}, app.config["SECRET_KEY"], algorithm="HS256")

    user = UserInfo.query.filter_by(email=email, password=password).first()
    user_data = user_sc.dump(user)
    usersend = {"token": str(token), "user": user_data}

    if not email or not password:
        return jsonify({"error": "empty email or password"}), 400

    if not user:
        return jsonify({"error": "invalid email or password"}), 401

    return jsonify(usersend)


@app.route("/resetpassword/sendcode", methods=["POST"])
def resetSend():
    email = request.json["email"]
    userInfo = UserInfo.query.filter_by(email=email).first()
    userId = userInfo.id
    if not userInfo:
        return jsonify({"error": "empty email or password"}), 400

    code = ""
    email = request.json["email"]
    for _ in range(4):
        digit = random.randint(0, 9)
        code += str(digit)
    code = int(code)
    sender_email = "iKun3900@gmail.com"
    sender_password = "unfchthqfmcfdobc"

    receiver_email = email
    subject = "code"
    body = str(code)

    email = EmailMessage()
    email["From"] = sender_email
    email["To"] = receiver_email
    email["subject"] = subject
    email.set_content(body)

    smtp = smtplib.SMTP("smtp.gmail.com", 587)
    smtp.starttls()
    smtp.login(sender_email, sender_password)
    smtp.sendmail(sender_email, receiver_email, email.as_string())

    return jsonify({"code": code, "userId": userId})


@app.route("/reset/<id>", methods=["PUT"])
def reset(id):
    password = request.json["password"]
    userInfo = UserInfo.query.get(id)
    userInfo.password = password

    db.session.commit()
    return jsonify({"password": password})


# todo update profile according to the userid
@app.route("/updateprofile/<userid>", methods=["PUT"])
def updateprofile(userid):
    email = request.json["email"]
    name = request.json["name"]
    workright = request.json["workright"]
    skill = request.json["skill"]
    avatarUrl = request.json["avatarUrl"]

    profileInfo = Profile.query.filter_by(uid=userid).first()
    userInfo = UserInfo.query.get(userid)
    if not profileInfo:
        profile = Profile(email, name, workright, skill, userid, avatarUrl)
        db.session.add(profile)
        db.session.commit()
    else:
        profileInfo.email = email
        profileInfo.name = name
        profileInfo.workrights = workright
        profileInfo.skill = skill
        profileInfo.avatarUrl = avatarUrl
        userInfo.email = email
        userInfo.name = name
        db.session.commit()

    return "1"

# get user information according to the user id
@app.route("/getUserProfile/<userid>", methods=["GET"])
def get_UserProfile(userid):
    ProfileInfo = db.session.query(Profile).filter(Profile.uid == userid)
    return profile_sc.jsonify(ProfileInfo)


@app.route("/project/<userid>", methods=["POST"])
def storeproject(userid):
    input = request.get_json()
    location = input["location"]
    job_classification = input["job_classification"]
    problem_statement = input["problem_statement"]
    requirement = input["requirement"]
    payment_type = input["payment_type"]

    curr_project = Project(
        location, job_classification, problem_statement, requirement, payment_type
    )

    if "desired_outcomes" in input:
        curr_project.desired_outcomes = input["desired_outcomes"]

    if "required_skill" in input:
        curr_project.required_skill = input["required_skill"]

    if "potential_deliverable" in input:
        curr_project.potential_deliverable = input["potential_deliverable"]

    if "expected_delivery_cycle" in input:
        curr_project.expected_delivery_cycle = input["expected_delivery_cycle"]

    curr_project.user_id = userid
    db.session.add(curr_project)
    db.session.commit()
    return project_sc.jsonify(curr_project)


@app.route("/project/<userid>", methods=["GET"])
def getprojects(userid):
    projects = db.session.query(Project).filter(Project.user_id == userid)
    return projects_sc.jsonify(projects)


if __name__ == "__main__":
    app.run(debug=True)
