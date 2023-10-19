from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import datetime
from dotenv import load_dotenv
import os
from model import *
from validation import *
from schema import SchemaError
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_mail import Mail, Message
from bcrypt import hashpw, gensalt, checkpw
from sqlalchemy import desc

load_dotenv()

app = Flask(__name__)

# Database config
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URI')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# JWT config
app.config["SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')

# Email config
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # 发送邮件的邮箱
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # 邮箱密码

mail = Mail(app)

CORS(app)
JWTManager(app)

# create table
with app.app_context():
    db.init_app(app)
    db.create_all()


# get user information according to the user id
@app.route("/user/<user_id>", methods=["GET"])
def get_user_info(user_id):
    user_info = User.query.get(user_id)
    results = user_sc.dump(user_info)
    return jsonify(results)


# get current user information
@app.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    profile_info = User.query.get(current_user_id)
    results = user_sc.dump(profile_info)
    return jsonify(results)


# send the code to frontend
@app.route("/sendCode", methods=["POST"])
def send_code():
    try:
        data = SEND_CODE_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    email = data["email"]
    code = generate_code()
    user_code = UserCode(code, email)
    db.session.add(user_code)
    db.session.commit()

    msg = Message('Verification your email', sender=app.config.get('MAIL_USERNAME'), recipients=[email])
    msg.body = f'Your verification code is: {code}'
    mail.send(msg)
    return jsonify({"msg": 'success'})


# sign up function for system
@app.route("/register", methods=["POST"])
def register():
    try:
        data = REGISTER_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    role = data["role"]
    email = data["email"]
    password = data["password"]
    passport = data["passport"]
    name = data["name"]
    code = data["code"]

    database_email = User.query.filter_by(email=email).first()

    if database_email:
        return jsonify({"msg": "This email has been registered"}), 400

    user_code = UserCode.query.filter(UserCode.email == email).order_by(desc(UserCode.create_at)).first()
    if not user_code:
        return jsonify({"msg": "You haven't sent the code yet"}), 400

    if code != user_code.vcode:
        return jsonify({"msg": "Error input code"}), 400

    user = User(role, email, hashpw(password.encode(), gensalt()).decode(), name, passport)
    db.session.add(user)
    db.session.commit()
    return jsonify({"token": create_access_token(identity=user.user_id)})


# sign in function for system
@app.route("/login", methods=["POST"])
def login():
    try:
        data = LOGIN_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return {"msg": "User does not exist"}, 400
    if not checkpw(password.encode(), user.password.encode()):
        return {"msg": "Wrong password"}, 400

    return jsonify({"token": create_access_token(identity=user.user_id)})


@app.route("/resetPassword/sendCode", methods=["POST"])
def reset_send():
    try:
        data = SEND_CODE_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    email = data["email"]
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "You haven't registered with our system yet"}), 400

    email = data["email"]
    code = generate_code()
    user_code = UserCode(code, email)
    db.session.add(user_code)
    db.session.commit()

    msg = Message('Verification Code', sender=app.config.get('MAIL_USERNAME'), recipients=[email])
    msg.subject = 'Reset your password'
    msg.body = f'Your verification code is: {code}'
    mail.send(msg)

    return jsonify({"msg": 'success', })


# just use for verify reset password.
@app.route('/verifyCode', methods=['POST'])
def verify_code():
    try:
        data = VERIFY_CODE_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    email = data['email']
    entered_code = data['code']

    user_code = UserCode.query.filter(UserCode.email == email).order_by(desc(UserCode.create_at)).first()
    if not user_code:
        return jsonify({"msg": "You haven't sent the code yet"}), 400

    if entered_code != user_code.vcode:
        return jsonify({"msg": "Error code"}), 400

    user = User.query.filter_by(email=email).first()
    return jsonify({"token": create_access_token(identity=user.user_id)})


@app.route("/resetPassword", methods=["PUT"])
@jwt_required()
def reset():
    try:
        data = RESET_PASSWORD_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    current_user_id = get_jwt_identity()
    password = data["password"]
    user = db.session.get(User, current_user_id)
    user.password = hashpw(password.encode(), gensalt()).decode()
    db.session.merge(user)
    db.session.commit()
    return jsonify({"msg": 'success'})


@app.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    try:
        data = UPDATE_PROFILE_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    current_user_id = get_jwt_identity()
    current_user = db.session.get(User, current_user_id)

    if "name" in data:
        current_user.name = data["name"]
    if "passport" in data:
        current_user.passport = data["passport"]
    if "avatarUrl" in data:
        current_user.avatarUrl = data["avatarUrl"]
    if "work_rights" in data:
        current_user.work_rights = data["work_rights"]
    if "skill" in data:
        current_user.skill = data["skill"]

    db.session.merge(current_user)
    db.session.commit()
    return jsonify({"message": "success"})


@app.route("/project", methods=["POST"])
@jwt_required()
def store_project(userid):
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


def generate_code():
    code = ""
    for _ in range(4):
        digit = random.randint(0, 9)
        code += str(digit)
    code = int(code)
    return code


if __name__ == "__main__":
    app.run(debug=True)
