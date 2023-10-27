from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from enum import Enum
from datetime import datetime

db = SQLAlchemy()
ma = Marshmallow()


class UserRole(Enum):
    student = 1
    industryPartner = 2
    academicSupervisor = 3

class OpportunityType(Enum):
    internship = 1
    individualProject = 2
    groupProject = 3




class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.INTEGER)
    email = db.Column(db.Text())
    passport = db.Column(db.Text())
    password = db.Column(db.Text())
    name = db.Column(db.Text())
    work_rights = db.Column(db.ARRAY(db.String))
    skill = db.Column(db.Text())
    avatarUrl = db.Column(db.Text())

    def __init__(self, role, email, password, name, passport):
        self.role = role
        self.email = email
        self.password = password
        self.passport = passport
        self.name = name


class UserSchema(ma.Schema):
    class Meta:
        fields = ("user_id", "role", "email", "passport", "name", "work_rights", "skill", "avatarUrl")


class UserCode(db.Model):
    user_code_id = db.Column(db.Integer, primary_key=True)
    vcode = db.Column(db.Text())
    email = db.Column(db.Text())
    create_at = db.Column(db.TIMESTAMP)

    def __init__(self, vcode, email):
        self.vcode = vcode
        self.email = email
        self.create_at = datetime.now()


user_sc = UserSchema()
users_sc = UserSchema(many=True)


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text())
    publish_date = db.Column(db.TIMESTAMP)
    location = db.Column(db.Text())
    job_classification = db.Column(db.Integer)
    problem_statement = db.Column(db.Text())
    requirement = db.Column(db.Text())
    payment_type = db.Column(db.Integer)

    desired_outcomes = db.Column(db.Text())
    required_skill = db.Column(db.Text())
    potential_deliverable = db.Column(db.Text())
    expected_delivery_cycle = db.Column(db.Text())
    user_id = db.Column(db.ForeignKey(User.user_id))
    user = db.relationship(
        "User",
        primaryjoin="User.user_id == Project.user_id",
        lazy=True,
    )

    def __init__(
            self, title, location, job_classification, problem_statement, requirement, payment_type
    ):
        self.title = title
        self.location = location
        self.job_classification = job_classification
        self.problem_statement = problem_statement
        self.requirement = requirement
        self.payment_type = payment_type


class ProjectSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "title",
            "publish_date",
            "location",
            "job_classification",
            "problem_statement",
            "requirement",
            "payment_type",
            "desired_outcomes",
            "required_skills",
            "potential_deliverables",
            "expected_delivery_cycle",
        )


project_sc = ProjectSchema()
projects_sc = ProjectSchema(many=True)
