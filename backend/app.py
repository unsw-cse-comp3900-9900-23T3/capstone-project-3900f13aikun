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
from datetime import datetime
from sqlalchemy import or_, not_, and_
from datetime import timedelta
from sqlalchemy.orm import joinedload

load_dotenv()

app = Flask(__name__)

# Database config
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URI')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# JWT config
secret_key = os.urandom(24)
# JWT config
app.config["JWT_SECRET_KEY"] = secret_key
JWT_ALGORITHM = 'HS256'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=2)

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
@jwt_required()
def get_user_info(user_id):
    user_info = User.query.get(user_id)
    if not user_info:
        return {"status": "Not Found"}, 404

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

    # if code != user_code.vcode:
    #     return jsonify({"msg": "Error input code"}), 400

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
    if "project_intention" in data:
        current_user.project_intention = data["project_intention"]
    if "skill" in data:
        current_user.skill = data["skill"]

    db.session.merge(current_user)
    db.session.commit()
    return jsonify({"message": "success"})


@app.route("/project", methods=["POST"])
@jwt_required()
def store_project():
    try:
        data = CREATE_PROJECT_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    current_user_id = get_jwt_identity()

    location = data["location"]
    title = data["title"]
    job_classification = data["job_classification"]
    problem_statement = data["problem_statement"]
    requirement = data["requirement"]
    payment_type = data["payment_type"]
    opportunity_type = data["opportunity_type"]

    curr_project = Project(
        title, location, job_classification, problem_statement, requirement, payment_type, opportunity_type
    )

    if "desired_outcomes" in data:
        curr_project.desired_outcomes = data["desired_outcomes"]

    if "required_skill" in data:
        curr_project.required_skill = data["required_skill"]

    if "potential_deliverable" in data:
        curr_project.potential_deliverable = data["potential_deliverable"]

    if "expected_delivery_cycle" in data:
        curr_project.expected_delivery_cycle = data["expected_delivery_cycle"]

    curr_project.publish_date = datetime.now()
    curr_project.user_id = current_user_id
    curr_project.project_status = ProjectStatusType.Initialization.value

    db.session.add(curr_project)
    db.session.commit()
    return jsonify({"message": "success"})


@app.route("/project", methods=["GET"])
@jwt_required(optional=True)
def get_projects_route():
    try:
        data = GET_TASKS_SCHEMA.validate(request.args.to_dict())
    except SchemaError as error:
        return {"status": "Bad request", "message": str(error)}, 400

    current_user_id = get_jwt_identity()
    projects = db.session.query(Project)

    if "job_classification" in data:
        job_classification = data['job_classification']
        projects = projects.filter(Project.job_classification == job_classification)

    if "location" in data:
        location = data['location']
        projects = projects.filter(Project.location.ilike(f"%{location}%"))

    if "keyword" in data:
        keyword = data['keyword']
        keyword_filter = or_(
            Project.title.ilike(f"%{keyword}%"),
            Project.problem_statement.ilike(f"%{keyword}%")
        )
        projects = projects.filter(or_(*keyword_filter))

    if "opportunity_type" in data:
        opportunity_type = data['opportunity_type']
        projects = projects.filter(Project.opportunity_type == opportunity_type)

    if "payment_type" in data:
        payment_type = data['payment_type']
        projects = projects.filter(Project.payment_type == payment_type)

    if "publish_date_type" in data:
        publish_date_type = data['publish_date_type']
        today = datetime.now().date()
        three_days_ago = today - timedelta(days=3)
        one_week_ago = today - timedelta(weeks=1)
        three_months_ago = today - timedelta(days=90)
        # today
        if publish_date_type == 1:
            projects = projects.filter(Project.publish_date.cast(db.Date) == today)

        if publish_date_type == 2:
            projects = projects.filter(Project.publish_date.cast(db.Date) >= three_days_ago)

        if publish_date_type == 3:
            projects = projects.filter(Project.publish_date.cast(db.Date) >= one_week_ago)

        if publish_date_type == 4:
            projects = projects.filter(Project.publish_date.cast(db.Date) >= three_months_ago)

    if not current_user_id:
        return projects_sc.jsonify(projects)

    else:
        result = []
        for project in projects:
            current_user = db.session.get(User, current_user_id)
            project_data = ProjectSchema().dump(project)
            project_data['is_saved'] = project in current_user.saved_projects
            result.append(project_data)
        return jsonify(result)


@app.route("/project-created", methods=["GET"])
@jwt_required()
def get_created_project():
    current_user_id = get_jwt_identity()
    projects = db.session.query(Project).filter(Project.user_id == current_user_id)

    return projects_sc.jsonify(projects)


@app.route("/project/<id>", methods=["GET"])
@jwt_required(optional=True)
def get_project_route(id):
    current_user_id = get_jwt_identity()
    project = db.session.get(Project, id)

    if not project:
        return {"status": "Not Found"}, 404

    if not current_user_id:
        return project_sc.jsonify(project)

    else:
        current_user = db.session.get(User, current_user_id)
        project_data = ProjectSchema().dump(project)
        project_data['is_saved'] = project in current_user.saved_projects
        return jsonify(project_data)


@app.route("/project", methods=["PUT"])
@jwt_required()
def update_project():
    try:
        data = UPDATE_PROJECT_SCHEMA.validate(request.json.copy())
    except SchemaError as error:
        return {"status": "Bad request", "message": str(error)}, 400
    current_user_id = get_jwt_identity()
    project = db.session.get(Project, data["id"])

    if not project:
        return {"status": "Not Found"}, 404
    if project.user_id != current_user_id:
        return {"status": "Permission denied"}, 401

    if "title" in data:
        project.title = data["title"]
    if "location" in data:
        project.location = data["location"]
    if "job_classification" in data:
        project.job_classification = data["job_classification"]
    if "problem_statement" in data:
        project.problem_statement = data["problem_statement"]
    if "requirement" in data:
        project.requirement = data["requirement"]
    if "payment_type" in data:
        project.payment_type = data["payment_type"]
    if "opportunity_type" in data:
        project.opportunity_type = data["opportunity_type"]
    if "desired_outcomes" in data:
        project.desired_outcomes = data["desired_outcomes"]
    if "required_skill" in data:
        project.required_skill = data["required_skill"]
    if "potential_deliverable" in data:
        project.potential_deliverable = data["potential_deliverable"]
    if "expected_delivery_cycle" in data:
        project.expected_delivery_cycle = data["expected_delivery_cycle"]

    db.session.merge(project)
    db.session.commit()

    return jsonify({"message": "success"})


@app.route("/project/<id>", methods=["DELETE"])
@jwt_required()
def delete_project(id):
    current_user_id = get_jwt_identity()
    project = db.session.get(Project, id)

    if not project:
        return {"status": "Not Found"}, 404

    if current_user_id != project.user_id:
        return {"msg": "No Permission"}, 400

    db.session.execute(user_saved_project.delete().where(user_saved_project.c.project_id == id))
    db.session.query(ApplyProject).filter(ApplyProject.project_id == id).delete()
    db.session.query(Feedback).filter(Feedback.project_id == id).delete()
    db.session.commit()

    db.session.delete(project)
    db.session.commit()
    return jsonify({'message': 'success'})


@app.route("/recommend/project", methods=["GET"])
@jwt_required(optional=True)
def get_recommend_project_route():
    current_user_id = get_jwt_identity()
    current_user = db.session.get(User, current_user_id)
    projects = db.session.query(Project)
    current_user_id = get_jwt_identity()
    current_user = db.session.get(User, current_user_id)

    if current_user.project_intention is not None:
        projects = projects.filter(Project.job_classification.in_(current_user.project_intention)).all()

    result = []
    for project in projects:
        current_user = db.session.get(User, current_user_id)
        project_data = ProjectSchema().dump(project)
        project_data['is_saved'] = project in current_user.saved_projects
        result.append(project_data)
    return jsonify(result)


@app.route("/group", methods=["POST"])
@jwt_required()
def store_group():
    try:
        data = CREATE_GROUP_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    current_user_id = get_jwt_identity()

    group_name = data["group_name"]
    group_description = data["group_description"]
    limit_no = data["limit_no"]
    is_private = data["is_private"]

    curr_group = Group(
        group_name, group_description, limit_no, is_private
    )

    curr_group.creator_id = current_user_id
    db.session.add(curr_group)
    db.session.commit()
    return jsonify({"message": "success"})


@app.route("/group/join/<group_id>", methods=["GET"])
@jwt_required()
def join_group_route(group_id):
    current_user_id = get_jwt_identity()
    user = db.session.get(User, current_user_id)
    group = db.session.get(Group, group_id)

    if not group:
        return {"status": "Not Found"}, 404

    if len(group.members) == group.limit_no - 1:
        return {"msg": "The Group is full"}, 400

    group.members.append(user)
    db.session.commit()
    return jsonify({"message": "success"})


@app.route("/group/leave/<group_id>", methods=["GET"])
@jwt_required()
def leave_group_route(group_id):
    current_user_id = get_jwt_identity()
    user = db.session.get(User, current_user_id)
    group = db.session.get(Group, group_id)

    if not group:
        return {"status": "Not Found"}, 404

    if user in group.members:
        group.members.remove(user)
        db.session.commit()
        return jsonify({"message": "success"})

    else:
        return {"msg": "The user not in the group"}, 404


@app.route("/group/<group_id>", methods=["GET"])
@jwt_required()
def get_group_route(group_id):
    group = db.session.get(Group, group_id)
    if not group:
        return {"status": "Not Found"}, 400

    return group_sc.jsonify(group)


@app.route("/group/<group_id>", methods=["DELETE"])
@jwt_required()
def delete_group_route(group_id):
    current_user_id = get_jwt_identity()
    group = db.session.get(Group, group_id)
    if not group:
        return {"status": "Not Found"}, 400
    if group.creator_id != current_user_id:
        return {"msg": "You don't have permission"}, 400

    db.session.delete(group)
    db.session.commit()
    return jsonify({"message": "success"})


@app.route("/group", methods=["GET"])
@jwt_required()
def get_groups_route():
    current_user_id = get_jwt_identity()
    groups = db.session.query(Group).filter(
        (Group.is_private == 0) & (Group.creator_id == current_user_id)
    )
    return groups_sc.jsonify(groups)


@app.route("/notInGroup", methods=["GET"])
@jwt_required()
def get_user_groups_route():
    current_user_id = get_jwt_identity()
    groups_without_current_user = Group.query.filter(
        (Group.creator_id != current_user_id) &
        (Group.is_private == 0) &
        not_(Group.members.any(User.user_id == current_user_id))
    ).all()
    return groups_sc.jsonify(groups_without_current_user)


@app.route("/group/remove", methods=["POST"])
@jwt_required()
def remove_group_member():
    try:
        data = REMOVE_GROUP_MEMBER_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    group_id = data["group_id"]
    remove_user_id = data["user_id"]
    current_user_id = get_jwt_identity()
    remove_user = db.session.get(User, remove_user_id)
    group = db.session.get(Group, group_id)
    if group.creator_id != current_user_id:
        return {"msg": "You don't have permission"}, 400

    if remove_user and group:

        if remove_user in group.members:
            group.members.remove(remove_user)
            db.session.commit()
            return jsonify({"message": "success"})

        else:
            return {"msg": "The user not in the group"}, 404
    else:
        return {"status": "Not Found"}, 404


@app.route("/joinedGroup", methods=["GET"])
@jwt_required()
def get_not_in_groups_route():
    current_user_id = get_jwt_identity()

    user_with_groups = User.query.options(joinedload(User.groups), joinedload(User.created_groups)).filter_by(
        user_id=current_user_id).first()
    joined_groups = user_with_groups.groups
    created_groups = user_with_groups.created_groups
    all_groups = list(joined_groups) + list(created_groups)
    return groups_sc.jsonify(all_groups)


@app.route("/group", methods=["PUT"])
@jwt_required()
def update_group_route():
    try:
        data = UPDATE_GROUP_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    current_user_id = get_jwt_identity()
    group = db.session.get(Group, data["group_id"])

    if current_user_id != group.creator_id:
        return {"msg": "You don't have permission"}, 400

    if "group_name" in data:
        group.group_name = data["group_name"]
    if "group_description" in data:
        group.group_description = data["group_description"]
    if "limit_no" in data:
        group.limit_no = data["limit_no"]
    if "is_private" in data:
        group.is_private = data["is_private"]

    db.session.merge(group)
    db.session.commit()
    return jsonify({"message": "success"})


@app.route("/savedProject", methods=["GET"])
@jwt_required()
def get_saved_projects_route():
    current_user_id = get_jwt_identity()
    user = db.session.get(User, current_user_id)

    return projects_sc.jsonify(user.saved_projects)


@app.route("/saved/project/<project_id>", methods=["GET"])
@jwt_required()
def add_saved_project_route(project_id):
    current_user_id = get_jwt_identity()
    current_user = db.session.get(User, current_user_id)
    project_to_save = db.session.get(Project, project_id)

    if not project_to_save:
        return {"msg": "There is no such project"}, 404

    current_user.saved_projects.append(project_to_save)
    db.session.commit()
    return jsonify({"message": "success"})


@app.route("/unsaved/project/<project_id>", methods=["GET"])
@jwt_required()
def unsaved_saved_project_route(project_id):
    current_user_id = get_jwt_identity()
    current_user = db.session.get(User, current_user_id)
    project_to_save = db.session.get(Project, project_id)

    if not project_to_save:
        return {"msg": "There is no such project"}, 404

    if project_to_save in current_user.saved_projects:
        current_user.saved_projects.remove(project_to_save)
        db.session.commit()
        return jsonify({"message": "success"})

    else:
        return {"msg": "The project is not saved"}, 404


@app.route("/recommend/teacher", methods=["GET"])
@jwt_required()
def get_recommend_teacher_route():
    current_user_id = get_jwt_identity()
    current_user = db.session.get(User, current_user_id)
    teachers = db.session.query(User).filter(User.role == UserRole.AcademicSupervisor.value)

    if current_user.project_intention is not None:
        teachers = teachers.filter(User.project_intention.op('&&')(current_user.project_intention))

    saved_users = db.session.query(UserSaved).filter(UserSaved.user_id == current_user_id).all()
    saved_users_ids = []
    for u in saved_users:
        saved_users_ids.append(u.saved_user_id)

    result = []
    for teacher in teachers:
        user_data = UserSchema().dump(teacher)
        user_data['is_saved'] = teacher.user_id in saved_users_ids
        result.append(user_data)
    return jsonify(result)


@app.route("/savedUser", methods=["GET"])
@jwt_required()
def get_saved_users_route():
    current_user_id = get_jwt_identity()
    saved_users = db.session.query(UserSaved).filter(UserSaved.user_id == current_user_id)

    return users_saved_sc.jsonify(saved_users)


@app.route("/savedUser/<user_id>", methods=["GET"])
@jwt_required()
def add_saved_users_route(user_id):
    current_user_id = get_jwt_identity()
    saved_user = UserSaved(current_user_id, user_id)
    db.session.add(saved_user)
    db.session.commit()

    return jsonify({"message": "success"})


@app.route("/unSavedUser/<user_id>", methods=["DELETE"])
@jwt_required()
def delete_saved_users_route(user_id):
    current_user_id = get_jwt_identity()
    un_saved_user = db.session.query(UserSaved).filter(
        and_(UserSaved.user_id == current_user_id, UserSaved.saved_user_id == user_id)).first()

    if not un_saved_user:
        return {"status": "Not Found"}, 404

    db.session.delete(un_saved_user)
    db.session.commit()

    return jsonify({"message": "success"})

@app.route("/applyProject", methods=["POST"])
@jwt_required()
def create_apply_project():
    try:
        data = CREATE_APPLY_PROJECT.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    current_user_id = get_jwt_identity()
    current_user = db.session.get(User, current_user_id)
    project_id = data["project_id"]
    project = db.session.get(Project, project_id)

    if current_user.role == UserRole.AcademicSupervisor.value:
        if project.project_status == ProjectStatusType.FoundTeacher:
            return {"msg": "The project is already have a teacher"}, 400

        apply_project = ApplyProject()
        apply_project.teacher_uni = data["teacher_uni"]
        apply_project.teacher_resumes = data["teacher_resumes"]
        apply_project.project_id = data["project_id"]
        apply_project.teacher_id = current_user_id
        apply_project.apply_status = ApplyStatusType.TeacherApplying.value
        db.session.merge(apply_project)
        db.session.commit()
        return jsonify({"message": "success"})

    if project.opportunity_type == OpportunityType.GroupProject.value:
        group_id = data["group_id"]
        group = db.session.get(Group, group_id)
        if not group:
            return {"msg": "Not Found group"}, 400

        apply_project = db.session.query(ApplyProject).filter(
            and_(ApplyProject.project_id == project_id,
                 ApplyProject.apply_status == ApplyStatusType.TeacherPass.value)).first()

        apply_project.group_id = data["group_id"]
        apply_project.student_uni = data["student_uni"]
        apply_project.student_resumes = data["student_resumes"]
        apply_project.student_id = current_user_id
        apply_project.apply_status = ApplyStatusType.StudentApplying.value
        db.session.merge(apply_project)
        db.session.commit()
        return jsonify({"message": "success"})

    apply_project = db.session.query(ApplyProject).filter(
        and_(ApplyProject.project_id == project_id,
             ApplyProject.apply_status == ApplyStatusType.TeacherPass.value)).first()
    apply_project.student_id = current_user_id
    apply_project.student_uni = data["student_uni"]
    apply_project.student_resumes = data["student_resumes"]
    apply_project.apply_status = ApplyStatusType.StudentApplying.value
    db.session.commit()
    return jsonify({"message": "success"})


@app.route("/applyProject", methods=["GET"])
@jwt_required()
def get_all_apply_project():
    # for IndustryPartner and AcademicSupervisor
    current_user_id = get_jwt_identity()
    current_user = db.session.get(User, current_user_id)
    if current_user.role == UserRole.AcademicSupervisor.value:
        apply_projects = db.session.query(ApplyProject).filter(ApplyProject.teacher_id == current_user_id)
        return apply_projects_sc.jsonify(apply_projects)

    if current_user.role == UserRole.IndustryPartner.value:
        apply_projects = db.session.query(ApplyProject).join(Project,
                                                             ApplyProject.project_id == Project.id).filter(
            Project.user_id == current_user_id).all()
        return apply_projects_sc.jsonify(apply_projects)
    
    
@app.route("/applyProject", methods=["Delete"])
@jwt_required()
def Delete_apply_project():
    delete_id = request.json['delete_id']
    
    db.session.query(ApplyProject).filter(ApplyProject.project_id == delete_id).delete()

    db.session.commit()
    return jsonify({"message": "success"})


@app.route("/applyStudentProject", methods=["GET"])
@jwt_required()
def get_student_apply_individual_project():
    current_user_id = get_jwt_identity()
    apply_projects = db.session.query(ApplyProject).filter(ApplyProject.student_id == current_user_id)
    return apply_projects_sc.jsonify(apply_projects)


@app.route("/applyTeacherProject", methods=["GET"])
@jwt_required()
def get_teacher_apply_individual_project():
    current_user_id = get_jwt_identity()
    apply_projects = db.session.query(ApplyProject).filter(ApplyProject.teacher_id == current_user_id)

    return apply_projects_sc.jsonify(apply_projects)






@app.route("/applyIndProject", methods=["GET"])
@jwt_required()
def get_industry_project_request():
    current_user_id = get_jwt_identity()

  
    apply_projects = db.session.query(ApplyProject).join(ApplyProject.project).filter(
        and_(
            Project.user_id == current_user_id,
            or_(ApplyProject.apply_status == 0 ,ApplyProject.apply_status == 3)
            )
        )


    apply_projects = apply_projects.options(joinedload(ApplyProject.project))

    return apply_projects_sc.jsonify(apply_projects)


@app.route("/teacherSup", methods=["POST"])
@jwt_required()
def if_teacher_sup():
    current_user_id = get_jwt_identity()
    projectId = request.json['project_id']
    apply_project = db.session.query(ApplyProject).filter(
        and_(
            ApplyProject.teacher_id == current_user_id,
            ApplyProject.project_id == projectId
        )
    ).first() 
    if apply_project and apply_project.apply_status != 2:
        return jsonify({"message": "1"})
    return jsonify({"message": "2"})


@app.route("/applyStudentGroupProject", methods=["GET"])
@jwt_required()
def get_student_apply_group_project():
    current_user_id = get_jwt_identity()
    # current_user = db.session.get(User, current_user_id)

    user_with_groups = User.query.options(joinedload(User.groups), joinedload(User.created_groups)).filter_by(
        user_id=current_user_id).first()
    joined_groups = user_with_groups.groups
    created_groups = user_with_groups.created_groups
    all_groups = list(joined_groups) + list(created_groups)

    groups_ids = []
    for g in all_groups:
        groups_ids.append(g.group_id)

    apply_projects = db.session.query(ApplyProject).filter(ApplyProject.group_id in groups_ids)

    return apply_projects_sc.jsonify(apply_projects)


@app.route("/applyProject", methods=["PUT"])
@jwt_required()
def handle_apply_project():
    try:
        data = UPDATE_APPLY_PROJECT.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    apply_project = db.session.get(ApplyProject, data["apply_id"])
    if apply_project.apply_status == ApplyStatusType.TeacherApplying.value:
        if data["apply_status"] == ApplyStatusType.TeacherPass.value:
            project = db.session.get(Project, apply_project.project_id)
            project.project_status = ProjectStatusType.FoundTeacher.value
            db.session.query(ApplyProject).filter(ApplyProject.project_id == apply_project.project_id).update(
                {ApplyProject.apply_status: ApplyStatusType.TeacherFail.value}, synchronize_session='fetch')
            db.session.commit()

        apply_project.apply_status = data["apply_status"]
        db.session.merge(apply_project)
        db.session.commit()

    if apply_project.apply_status == ApplyStatusType.StudentApplying.value:
        if data["apply_status"] == ApplyStatusType.StudentPass.value:
            project = db.session.get(Project, apply_project.project_id)
            project.project_status = ProjectStatusType.Started.value
            db.session.query(ApplyProject).filter(and_(ApplyProject.project_id == apply_project.project_id,
                                                       ApplyProject.apply_status == ApplyStatusType.TeacherPass.value)).update(
                {ApplyProject.apply_status: ApplyStatusType.StudentFail.value}, synchronize_session='fetch')
            db.session.commit()

        apply_project.apply_status = data["apply_status"]
        db.session.merge(apply_project)
        db.session.commit() 

    return jsonify({"message": "success"})


@app.route("/applyProject/<project_id>", methods=["GET"])
@jwt_required()
def get_apply_project_detail(project_id):
    apply_project = db.session.query(ApplyProject).filter(ApplyProject.id == project_id).first()
    return apply_project_sc.jsonify(apply_project)



@app.route("/feedback", methods=["POST"])
@jwt_required()
def create_feedback():
    try:
        data = CREATE_FEEDBACK_SCHEMA.validate(request.json)
    except SchemaError as error:
        return {"msg": str(error)}, 400

    feedback = db.session.query(Feedback).filter(Feedback.project_id == data["project_id"]).first()
    if feedback is None:
        feedback = Feedback()

    if "demo_feedback" in data:
        feedback.demo_feedback = data["demo_feedback"]
    if "final_feedback" in data:
        feedback.final_feedback = data["final_feedback"]
    if "evaluating_deliverables" in data:
        feedback.evaluating_deliverables = data["evaluating_deliverables"]
    if "problems" in data:
        feedback.problems = data["problems"]
    if "contributions" in data:
        feedback.contributions = data["contributions"]
    if "student_experience" in data:
        feedback.student_experience = data["student_experience"]
    if "supervisor_experience" in data:
        feedback.supervisor_experience = data["supervisor_experience"]
    feedback.project_id = data["project_id"]
    db.session.merge(feedback)
    db.session.commit()
    return jsonify({"message": "success"})


@app.route("/feedback/<project_id>", methods=["GET"])
@jwt_required()
def get_project_feedback(project_id):
    feedback = db.session.query(Feedback).filter(Feedback.project_id == project_id).first()
    return feedback_sc.jsonify(feedback)


def generate_code():
    code = ""
    for _ in range(4):
        digit = random.randint(0, 9)
        code += str(digit)
    code = int(code)
    return code


if __name__ == "__main__":
    app.run(debug=True)
