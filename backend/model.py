from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from enum import Enum
from datetime import datetime

db = SQLAlchemy()
ma = Marshmallow()


class UserRole(Enum):
    Student = 1
    IndustryPartner = 2
    AcademicSupervisor = 3


class OpportunityType(Enum):
    Internship = 1
    IndividualProject = 2
    GroupProject = 3


class PaymentType(Enum):
    Paid = 1
    NonPaid = 2


class ProjectStatusType(Enum):
    Initialization = 1
    FoundTeacher = 2
    Started = 3
    Finished = 4


class ApplyStatusType(Enum):
    TeacherApplying = 0
    TeacherPass = 1
    TeacherFail = 2
    StudentApplying = 3
    StudentPass = 4
    StudentFail = 5


user_saved_project = db.Table(
    'user_project_association',
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id'), primary_key=True),
    db.Column('project_id', db.Integer, db.ForeignKey('project.id'), primary_key=True))


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.INTEGER)
    email = db.Column(db.Text())
    passport = db.Column(db.Text())
    password = db.Column(db.Text())
    name = db.Column(db.Text())
    work_rights = db.Column(db.ARRAY(db.INTEGER))
    project_intention = db.Column(db.ARRAY(db.INTEGER))
    skill = db.Column(db.Text())
    avatarUrl = db.Column(db.Text())
    groups = db.relationship('Group', secondary='user_group', back_populates='members')
    created_groups = db.relationship('Group', back_populates='creator')
    saved_projects = db.relationship('Project', secondary=user_saved_project,
                                     cascade='save-update, merge, refresh-expire',
                                     )

    def __init__(self, role, email, password, name, passport):
        self.role = role
        self.email = email
        self.password = password
        self.passport = passport
        self.name = name


class UserSchema(ma.Schema):
    class Meta:
        fields = (
            "user_id", "role", "email", "passport", "name", "work_rights", "project_intention", "skill", "avatarUrl")


user_sc = UserSchema()
users_sc = UserSchema(many=True)


class UserCode(db.Model):
    user_code_id = db.Column(db.Integer, primary_key=True)
    vcode = db.Column(db.Text())
    email = db.Column(db.Text())
    create_at = db.Column(db.TIMESTAMP)

    def __init__(self, vcode, email):
        self.vcode = vcode
        self.email = email
        self.create_at = datetime.now()


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text())
    publish_date = db.Column(db.TIMESTAMP)
    location = db.Column(db.Text())
    job_classification = db.Column(db.Integer)
    problem_statement = db.Column(db.Text())
    requirement = db.Column(db.Text())
    payment_type = db.Column(db.Integer)
    opportunity_type = db.Column(db.Integer)
    project_status = db.Column(db.Integer)

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
            self, title, location, job_classification, problem_statement, requirement, payment_type, opportunity_type
    ):
        self.title = title
        self.location = location
        self.job_classification = job_classification
        self.problem_statement = problem_statement
        self.requirement = requirement
        self.payment_type = payment_type
        self.opportunity_type = opportunity_type


class ProjectSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "title",
            "publish_date",
            "location",
            "project_status",
            "job_classification",
            "problem_statement",
            "requirement",
            "payment_type",
            "opportunity_type",
            "desired_outcomes",
            "required_skill",
            "potential_deliverable",
            "expected_delivery_cycle",
        )


project_sc = ProjectSchema()
projects_sc = ProjectSchema(many=True)

# intermediate table
user_group = db.Table('user_group',
                      db.Column('user_id', db.Integer, db.ForeignKey('user.user_id'), primary_key=True),
                      db.Column('group_id', db.Integer, db.ForeignKey('group.group_id'), primary_key=True)
                      )


class Group(db.Model):
    group_id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.Text())
    group_description = db.Column(db.Text())
    limit_no = db.Column(db.Integer)
    # 0:public 1:private
    is_private = db.Column(db.Integer)
    creator_id = db.Column(db.ForeignKey(User.user_id))
    creator = db.relationship('User', back_populates='created_groups', foreign_keys=[creator_id])
    members = db.relationship('User', secondary='user_group', back_populates='groups')

    def __init__(
            self, group_name, group_description, limit_no, is_private
    ):
        self.group_name = group_name
        self.group_description = group_description
        self.limit_no = limit_no
        self.is_private = is_private


class GroupSchema(ma.Schema):
    members = ma.Nested(UserSchema, many=True)
    creator = ma.Nested(UserSchema)

    class Meta:
        model = Group
        include_fk = True
        fields = (
            "group_id",
            "group_name",
            "group_description",
            "limit_no",
            "is_private",
            "creator_id",
            "creator",
            "members"
        )


group_sc = GroupSchema()
groups_sc = GroupSchema(many=True)


class UserSaved(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey(User.user_id))
    user = db.relationship('User', foreign_keys=[user_id])
    saved_user_id = db.Column(db.ForeignKey(User.user_id))
    saved_user = db.relationship('User', foreign_keys=[saved_user_id])

    def __init__(
            self, user_id, saved_user_id
    ):
        self.user_id = user_id
        self.saved_user_id = saved_user_id


class UserSavedSchema(ma.Schema):
    saved_user = ma.Nested(UserSchema)

    class Meta:
        fields = ("id", "user_id", "saved_user_id", "saved_user")


user_saved_sc = UserSavedSchema()
users_saved_sc = UserSavedSchema(many=True)


class ApplyProject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    teacher_uni = db.Column(db.Integer)
    teacher_resumes = db.Column(db.Text())
    student_uni = db.Column(db.Integer)
    student_resumes = db.Column(db.Text())
    teacher_id = db.Column(db.ForeignKey(User.user_id))
    teacher = db.relationship('User', foreign_keys=[teacher_id])
    student_id = db.Column(db.ForeignKey(User.user_id))
    student = db.relationship('User', foreign_keys=[student_id])
    group_id = db.Column(db.ForeignKey(Group.group_id))
    group = db.relationship('Group', foreign_keys=[group_id])
    project_id = db.Column(db.ForeignKey(Project.id))
    project = db.relationship('Project', foreign_keys=[project_id])
    apply_status = db.Column(db.Integer)


class ApplyProjectSchema(ma.Schema):
    teacher = ma.Nested(UserSchema)
    student = ma.Nested(UserSchema)
    group = ma.Nested(GroupSchema)
    project = ma.Nested(ProjectSchema)

    class Meta:
        fields = (
        "id", "apply_status", "group", "project", "teacher", "student", "student_uni", "student_resumes", "teacher_uni",
        "teacher_resumes")


apply_project_sc = ApplyProjectSchema()
apply_projects_sc = ApplyProjectSchema(many=True)
