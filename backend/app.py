from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from sqlalchemy import func, and_, or_, Sequence, MetaData, ForeignKey
import jwt
from sqlalchemy.dialects.postgresql import ARRAY
import datetime
from sqlalchemy.orm import relationship
from passlib.hash import sha256_crypt


app = Flask(__name__)

CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/3900pro'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
app.config['SECRET_KEY'] = 'your_secret_key'  

class Profile(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), nullable=False)
    avatar_url = db.Column(db.String(255), nullable=False) 
    availability = db.Column(ARRAY(db.Integer), nullable=False)
    skill = db.Column(db.Text(), nullable=False)

    uid = db.Column(db.Integer, ForeignKey('user.uid'), unique=True, nullable=True)
    user = relationship('User', foreign_keys=[uid])


    def __init__(self, name, email, user):
        self.name = name
        self.email = email
        self.avatar_url = 'https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png' # default avatar
        self.availability = []
        self.skill = ''
        self.user = user


class ProfileSchema(ma.Schema):
    class Meta:
        fields = ('pid', 'uid', 'name', 'email', 'avatar_url', 'availability', 'skill')

profile_sc = ProfileSchema()
profiles_sc = ProfileSchema(many=True)



# ================================================
class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.Text(), nullable=False)
    role = db.Column(db.Integer, nullable=False)

    # pid for the project that student is currently doing
    # None for student means studnet is currently available
    # None for industry partner and academic
    pid = db.Column(db.Integer, ForeignKey('project.pid'), unique=False, nullable=True)
    project = relationship('Project', foreign_keys=[pid])

    # project saver folder for user
    saved_pids = db.Column(ARRAY(db.Integer), nullable=False)

    # teams that user is a member of (tids attribute of academic supervisor and indusrty partner is always be null)
    tids = db.Column(ARRAY(db.Integer), nullable=False)
    
    # if status = 0 means no avilable for all project applications (only for student)
    status = db.Column(db.Integer, nullable=False) 

    def __init__(self, email, password, role):
        self.project = None
        self.email = email
        self.password = sha256_crypt.hash(password)
        self.role = role
        self.status = 1
        self.saved_pids = []
        self.tids = []

class UserSchema(ma.Schema):
    class Meta:
        fields = ('uid', 'pid', 'email', 'password', 'role', 'status', 'saved_pids', 'tids')

user_sc = UserSchema()
users_sc = UserSchema(many=True)


# ================================================
class Project(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.Text(), nullable=False)
    job_classification = db.Column(db.Integer, nullable=False)
    problem_statement = db.Column(db.Text(), nullable=False)
    requirement = db.Column(db.Text(), nullable=False)

    # if payment = 0, frontend will show "Non-paid Opportunity"
    # if payment > 0, frontend will show the payment amount in AUD
    payment = db.Column(db.Float, nullable=False)
    min_student_num = db.Column(db.Integer, nullable=False)
    max_student_num = db.Column(db.Integer, nullable=False)

    desired_outcomes = db.Column(db.Text(), nullable=True)
    required_skill = db.Column(db.Text(), nullable=True)
    potential_deliverable = db.Column(db.Text(), nullable=True)
    expected_delivery_cycle = db.Column(db.Text(), nullable=True)

    # 1 means "Open for applications"
    # 2 means "Assessing applications"
    # 3 means "Sending invitations"
    # 4 means "Delivering"
    # 5 means "Finished"
    status = db.Column(db.Integer, nullable=False)

    # Internal data

    # aids for applications
    practitioner_applications = db.Column(ARRAY(db.Integer), nullable=True)
    academic_applications = db.Column(ARRAY(db.Integer), nullable=True)

    # assigned_practitioner & assigned_academic will be not NULL until status == 3
    # system will mark practitioner and academic who receives invitation with negative id and convert it to positive when they accept it OR make it be NULL again when they reject
    assigned_practitioner = db.Column(db.Integer, nullable=True) # uid for individual project OR tid for group project when min_student_num > 1
    assigned_academic = db.Column(db.Integer, nullable=True)

    # creator
    uid = db.Column(db.Integer, ForeignKey('user.uid'), unique=False, nullable=True)
    user = relationship('User', foreign_keys=[uid])


    def __init__(self, user, location, job_classification, problem_statement, requirement, payment, min_student_num, max_student_num):
        self.user = user
        self.location = location
        self.job_classification = job_classification
        self.problem_statement = problem_statement
        self.requirement = requirement
        self.payment = payment
        self.status = 1
        self.min_student_num = min_student_num
        self.max_student_num = max_student_num
        self.practitioner_applications = []
        self.academic_applications = []

class ProjectSchema(ma.Schema):
    class Meta:
        fields = ('pid', 'uid', 'location', 'job_classification', 'problem_statement', 'requirement', 'payment_type', 'min_student_num', 'max_student_num', 'desired_outcomes', 'required_skills', 'potential_eliverables', 'expected_delivery_cycle', 'status', 'practitioner_applications', 'academic_applications', 'assigned_practitioner', 'assigned_academic')

project_sc = ProjectSchema()
projects_sc = ProjectSchema(many=True)


# ================================================
class Team(db.Model):
    tid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    classification = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text(), nullable=False)

    # a least greater than 1 when a team is created(exclude the team leader)
    # when team is delivering a project, the available_spots will be negative number of current available_spots
    # if there is current available_spots is 0 then convert it to -30
    available_spots = db.Column(db.Integer, nullable=False) 
    members = db.Column(ARRAY(db.Integer), nullable=False)
    # team applications
    aids  = db.Column(ARRAY(db.Integer), nullable=False)

    # team leader uid
    uid = db.Column(db.Integer, ForeignKey('user.uid'), unique=False, nullable=True)
    user = relationship('User', foreign_keys=[uid])


    def __init__(self, user, name, classification, descrpition, available_spots):
        self.user = user
        self.name =  name
        self.classification = classification
        self.description = descrpition
        self.available_spots = available_spots
        self.members = []
        self.aids = [] # if aids only contains -1 means that Team is currently delivering a team project

class TeamSchema(ma.Schema):
    class Meta:
        fields = ('tid', 'uid','name', 'classification', 'description', 'available_spots', 'members', 'aids')

team_sc = TeamSchema()
teams_sc = TeamSchema(many=True)

# ================================================
class Application(db.Model):
    aid = db.Column(db.Integer, primary_key=True)
    # Mandatory information 
    applicant_id = db.Column(db.Integer, nullable=False)
    applicant_type = db.Column(db.Integer, nullable=False) # 0 means individual student, 1 means studnet team, 2 means academic
    professional_summary = db.Column(db.Text(), nullable=False)
    skills = db.Column(db.Text(), nullable=False)
    experiences = db.Column(db.Text(), nullable=False)
    eduction = db.Column(db.Text(), nullable=False)
    availability = db.Column(ARRAY(db.Integer), nullable=False)

    # For applicants track application status
    # 1 means application is not yet been assessed
    # 2 means application is under assessment
    # 3 means applicant received the invitation for project
    # 4 means applicant get rejected for the project
    # 5 means applicant has accepted the invitation for project
    # 6 means applicant has rejected the invitation for project
    status = db.Column(db.Integer, nullable=False)

    # Optional information
    cover_leter = db.Column(db.Text(), nullable=True)
    additional_info = db.Column(db.Text(), nullable=True)

    # interal data
    priority_level = db.Column(db.Integer, nullable=False)

    pid = db.Column(db.Integer, ForeignKey('project.pid'), unique=False, nullable=True)
    project = relationship('Project', foreign_keys=[pid])


    def __init__(self, applicant_id, applicant_type, professional_summary, skills, experiences, eduction, availability, project):
        self.applicant_id = applicant_id
        self.applicant_type = applicant_type
        self.professional_summary = professional_summary
        self.skills = skills
        self.experiences = experiences
        self.eduction = eduction
        self.availability = availability
        self.status = 1
        self.project = project
        self.priority_level = 0


class ApplicationSchema(ma.Schema):
    class Meta:
        fields = ('aid', 'pid', 'applicant_id', 'applicant_type','professional_summary', 'skills', 'experiences', 'eduction', 'availability', 'cover_leter', 'additional_info', 'status', 'priority_level')


application_sc = ApplicationSchema()
applications_sc = ApplicationSchema(many=True)






# ================================================
#create table
with app.app_context():
    db.create_all()
# ================================================


################################################################################
#########                              Auth                            #########
################################################################################

#sign up function for system
@app.route('/register/', methods=['POST'])
def register():
    
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
    
    curr_user = User(email, password, role)
    curr_user_profile = Profile(name, email, curr_user)

    db.session.add(curr_user)
    db.session.add(curr_user_profile)
    
    db.session.commit()

    return user_sc.jsonify(curr_user)

#sign in function for system
@app.route('/login/', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    if not email or not password:
        return jsonify({'error': 'empty email or password'}), 400
    
    user = User.query.filter_by(email=email).first()

    if not user or not sha256_crypt.verify(password, user.password):
        return jsonify({'error': 'invalid email or password'}), 401

    token = jwt.encode({'user_id': email}, app.config['SECRET_KEY'], algorithm='HS256')
    user_data = user_sc.dump(user)
    usersend = {'token': str(token), 'user': user_data}

    return jsonify(usersend)

################################################################################
#########                            Profile                           #########
################################################################################

# Get all info in profile for the user
@app.route('/profile/details/<userid>/', methods=['GET'])
def getprofile(userid):
    profile = Profile.query.filter_by(uid=userid).first()
    return profile_sc.jsonify(profile)

# Update any section of info in profile for the user
@app.route('/profile/update/<userid>/', methods=['PUT'])
def updateprofilef1(userid):
    profile = Profile.query.filter_by(uid=userid).first()

    input = request.get_json()

    if 'name' in input:
        profile.name = input['name']

    if 'avatar_url' in input:
        profile.avatar_url = input['avatar_url']

    if 'availability' in input:
        profile.availability = input['availability']

    if 'skill' in input:
        profile.skill = input['skill']


    db.session.commit()

    return profile_sc.jsonify(profile)


# Reset the password of the user
@app.route('/resetpassword/<userid>/', methods=['PUT'])
def reset(userid):
    user = User.query.filter_by(uid=userid).first()
    user.password = sha256_crypt.hash(request.json['new_password'])
    db.session.commit()

    return user_sc.jsonify(user)

################################################################################
#########                            Project                           #########
################################################################################

########################################
####     Project create & modify    ####
########################################


# Only indusrty partner can create opportunities
@app.route('/project/create/<userid>/', methods=['POST'])
def storeproject(userid):
    input = request.get_json()

    location = input['location']
    job_classification = input['job_classification']
    problem_statement = input['problem_statement']
    requirement = input['requirement']
    payment = input['payment']
    min_student_num = input['min_student_num']
    max_student_num = input['max_student_num']

    curr_project = Project(User.query.filter_by(uid=userid).first(), location, job_classification, problem_statement, requirement, payment, min_student_num, max_student_num)

    if 'desired_outcomes' in input:
        curr_project.desired_outcomes = input['desired_outcomes']

    if 'required_skill' in input:
        curr_project.required_skill = input['required_skill']

    if 'potential_deliverable' in input:
        curr_project.potential_deliverable = input['potential_deliverable']

    if 'expected_delivery_cycle' in input:
        curr_project.expected_delivery_cycle = input['expected_delivery_cycle']

    db.session.add(curr_project)

    db.session.commit()

    return project_sc.jsonify(curr_project)

# Only opportunities creator can modify his/her opportunities when project status = 1 or 4
# when project status = 1, all attributes of project can be modified (except internal data)
# when project status = 4, only "problem_statement", "requirement", "desired_outcomes", "potential_deliverable" and "expected_delivery_cycle" can be modified
@app.route('/project/modify/<userid>/<projectid>/', methods=['PUT'])
def modifyproject(userid, projectid):

    curr_project = Project.query.filter_by(pid=projectid).first()

    input = request.get_json()


    if curr_project.status == 1:
        if 'location' in input:
            curr_project.location = input['location']

        if 'job_classification' in input:
            curr_project.job_classification = input['job_classification']
        
        if 'payment' in input:
            curr_project.payment = input['payment']
        
        if 'min_student_num' in input:
            curr_project.min_student_num = input['min_student_num']
        
        if 'max_student_num' in input:
            curr_project.max_student_num = input['max_student_num']

        if 'required_skill' in input:
            curr_project.required_skill = input['required_skill']

    if curr_project.status == 1 or curr_project.status == 4:
        if 'problem_statement' in input:
            curr_project.problem_statement = input['problem_statement']

        if 'requirement' in input:
            curr_project.requirement = input['requirement']
        
        if 'desired_outcomes' in input:
            curr_project.desired_outcomes = input['desired_outcomes']

        if 'potential_deliverable' in input:
            curr_project.potential_deliverable = input['potential_deliverable']

        if 'expected_delivery_cycle' in input:
            curr_project.expected_delivery_cycle = input['expected_delivery_cycle']
    
    # update status for students in User
    if 'status' in input:
        curr_project.status += 1 
        # TODO update status of application




        # Update selected practitioner status to 
        # Update rest of application status to 4
        #if curr_project.status == 4:

        

        # update user status
        # elif curr_project.status == 5: 

    db.session.commit()

    return project_sc.jsonify(curr_project)



########################################
#########    Project Browse    #########
########################################

@app.route('/project/browse/', methods=['GET'])
def browseproject():
    return



@app.route('/project/browse/myproject/current/<userid>/', methods=['GET'])
def getcurrentproject(userid):
    user = User.query.filter_by(uid=userid).first()

    if user.role == 0: # if student
        
        # student can only take one project at a time
        curr_project = Project.query.filter_by(pid=user.pid).first()
        return project_sc.jsonify(curr_project)

    elif user.role == 1: # if industry partner
        curr_projects = Project.query.filter(and_(Project.uid==userid, Project.status < 5)).all()
    
    else: # if academic

       accepted_applications = Application.query.filter(and_(Application.applicant_id==userid, Application.applicant_type==2, Application.status==5))
    #    demanded_applications = [application for application in accepted_applications if application.project.status == 4]
       projects_id = [application.pid for application in accepted_applications]
       curr_projects = Project.query.filter(and_(Project.pid.in_(projects_id), Project.status==4))
       
    return projects_sc.jsonify(curr_projects)



@app.route('/project/browse/myproject/past/<userid>/', methods=['GET'])
def getpastproject(userid):
    user = User.query.filter_by(uid=userid).first()

    if user.role == 0: # if student OR academic
        accepted_applications = Application.query.filter(and_(Application.applicant_id==userid, Application.applicant_type==2, Application.status==5))
        projects_id = [application.pid for application in accepted_applications]
        past_projects = Project.query.filter(and_(Project.pid.in_(projects_id), Project.status==5))
    
    else: # if industry partner
        past_projects = Project.query.filter(and_(Project.uid==userid, Project.status==5)).all()

    return projects_sc.jsonify(past_projects)


@app.route('/project/search/<projectid>/', methods=['GET'])
def getproject(projectid):
   return project_sc.jsonify(Project.query.filter_by(pid=projectid).first())

########################################
#########     Project Saver    #########
########################################

# Save projects that user interesting in
@app.route('/project/save/<userid>/<projectid>/', methods=['PUT'])
def saveproject(userid, projectid):
    user = User.query.filter_by(uid=userid).first()

    user.saved_pids = func.array_append(user.saved_pids, int(projectid))

    db.session.commit()

    return user_sc.jsonify(user)


# Unsave projects that user not longer interesting in
@app.route('/project/unsave/<userid>/<projectid>/', methods=['PUT'])
def unsaveproject(userid, projectid):

    user = User.query.filter_by(uid=userid).first()

    user.saved_pids = func.array_remove(user.saved_pids, int(projectid))

    db.session.commit()
    
    return user_sc.jsonify(user)

# Show all projects been saved
@app.route('/project/mysaved/<userid>/', methods=['GET'])
def mysavedproject(userid):

    user = User.query.filter_by(uid=userid).first()

    Project.pid.in_(user.saved_pids)

    saved_projects = Project.query.filter(Project.pid.in_(user.saved_pids)).all()

    return projects_sc.jsonify(saved_projects)

########################################
#########          Team        #########
########################################

@app.route('/team/create/<userid>/', methods=['POST'])
def createteam(userid):
    user = User.query.filter_by(uid=userid).first()
    new_team = Team(user, request.json['name'], request.json['classification'], request.json['description'], request.json['available_spots'])

    db.session.add(new_team)
    db.session.commit()

    user.tids = func.array_append(user.tids, new_team.tid)
    db.session.commit()

    return team_sc.jsonify(new_team)

# browse teams meet requirements
@app.route('/team/browse/<userid>/', methods=['GET'])
def browseteam(userid):
    input = request.get_json()

    teams = Team.query

    # filter section (0 means "Any i.e. all records")
    if input['availability'] != 0:
        teams = teams.filter(Team.available_spots>0)
    
    if input['classification'] != 0:
        teams = teams.filter_by(classification=input['classification'])

    # sort section
    if input['availability_sort'] == 1:
        teams = teams.order_by(Team.available_spots.desc()).all()
    elif input['availability_sort'] == 2:
        teams = teams.order_by(Team.available_spots.asc()).all()
        
    return teams_sc.jsonify(teams)


# browse teams that user currently is a member of
@app.route('/team/browse/myteam/<userid>/', methods=['GET'])
def getcurrentteam(userid):
    user = User.query.filter_by(uid=userid).first()
    curr_teams = Team.query.filter(Team.tid.in_(user.tids)).all()
        
    return teams_sc.jsonify(curr_teams)


@app.route('/team/search/<userid>/<teamid>/', methods=['GET'])
def getteam(userid, teamid):
    return team_sc.jsonify(Team.query.filter_by(tid=teamid).first())

@app.route('/team/update/<userid>/<teamid>/', methods=['PUT'])
def updateteamdetails(userid, teamid):
    curr_team = Team.query.filter_by(tid=teamid).first()

    input = request.get_json()

    if 'name' in input:
        curr_team.name = input['name']

    if 'classification' in input:
        curr_team.classification = input['classification']
    
    if 'description' in input:
        curr_team.description = input['description']

    db.session.commit()

    return team_sc.jsonify(curr_team)
    

# join a team
# only avaiable when user status is 1 and user is not a memeber of the target team
@app.route('/team/join/<userid>/<teamid>/', methods=['PUT'])
def jointeam(userid, teamid):
    curr_team = Team.query.filter_by(tid=teamid).first()

    curr_team.available_spots -= 1
    curr_team.members = func.array_append(curr_team.members, int(userid))

    user = User.query.filter_by(uid=userid).first()
    user.tids = func.array_append(user.tids, curr_team.tid)

    db.session.commit()

    return team_sc.jsonify(curr_team)






# remove applications that no longers fit the min_student_num after member leave or get removed from the team
def teamapplicationvalidityverification(teamid):
    curr_team = Team.query.filter_by(tid=teamid).first()
    team_num = len(curr_team.members) + 1

    curr_applications = Application.query.filter(Application.aid.in_(curr_team.aids)).all()
    curr_applications_aids_pids = [(application.project.pid, application.aid) for application in curr_applications]

    counter = 0
    application_num = len(curr_team.aids)
    while counter < application_num:
        
        curr_project = Project.query.filter_by(pid=curr_applications_aids_pids[counter][0]).first()
        if curr_project.min_student_num > team_num:
            withdrawapplication(-1, curr_applications_aids_pids[counter][1])
        
        counter += 1

    return team_sc.jsonify(curr_team)




# leave a team
# only avaiable when user is a memeber of the target team
# if user is a team leader of the team and there are more than 1 members in the group ====> user need to assign the leader permission to another leader first
# if there is only one member in the team, the team will be dismissed and all contents related to the team will be removed
@app.route('/team/leave/<userid>/<teamid>/', methods=['PUT'])
def leaveteam(userid, teamid):
    userid = int(userid)

    dismiss_flag = 0

    curr_team = Team.query.filter_by(tid=teamid).first()

    if curr_team.uid == userid:
        if len(curr_team.members) > 0:
            return jsonify({'error': 'Leader need to assign leader permission to another member before leaving'}), 400
        else:            
            # dismiss the team
            Team.query.filter_by(tid=teamid).delete(synchronize_session=False)
            dismiss_flag = 1
            
    else:
        curr_team.members = func.array_remove(curr_team.members, userid)


    if dismiss_flag != 1:
        curr_team.available_spots += 1

    user = User.query.filter_by(uid=userid).first()
    user.tids = func.array_remove(user.tids, curr_team.tid)


    db.session.commit()

    if dismiss_flag == 1:
        return jsonify('Dismissed the team'), 200
    else:
        teamapplicationvalidityverification(teamid)
    
    return team_sc.jsonify(curr_team)

# assign leader permission
# only avaiable when user is a team leader of the target team and there are more than one users in the team
@app.route('/team/assign/<userid>/<teamid>/<expecteduid>/', methods=['PUT'])
def assignleader(userid, teamid, expecteduid):

    curr_team = Team.query.filter_by(tid=teamid).first()

    curr_team.user = User.query.filter_by(uid=expecteduid).first()
    curr_team.members = func.array_remove(curr_team.members, int(expecteduid))
    curr_team.members = func.array_append(curr_team.members, int(userid))

    db.session.commit()

    return team_sc.jsonify(curr_team)

# Remove a team member (only available for a team leader)
# only avaiable when user is a team leader of the target team and there are more than one users in the team
# team leader cant remove himself/herself
@app.route('/team/remove/<userid>/<teamid>/<expecteduid>/', methods=['PUT'])
def removemember(userid, teamid, expecteduid):

    curr_team = Team.query.filter_by(tid=teamid).first()
    curr_team.available_spots += 1
    curr_team.members = func.array_remove(curr_team.members, int(expecteduid))

    user = User.query.filter_by(uid=expecteduid).first()
    user.tids = func.array_remove(user.tids, curr_team.tid)

    teamapplicationvalidityverification(teamid)

    db.session.commit()

    return team_sc.jsonify(curr_team)

########################################
#########      Application     #########
########################################
# create and submit application to a sepecific project
@app.route('/application/create/<userid>/<projectid>/', methods=['POST'])
def applyproject(userid, projectid):
    curr_project = Project.query.filter_by(pid=projectid).first()
    curr_user = User.query.filter_by(uid=userid).first()

    new_application = Application(request.json['applicant_id'], request.json['applicant_type'], request.json['professional_summary'], request.json['skills'], request.json['experiences'], request.json['education'], request.json['availability'], curr_project)

    input = request.get_json()
    if 'cover_leter' in input:
        new_application.cover_leter = input['cover_leter']
    if 'additional_info' in input:
        new_application.additional_info = input['additional_info']

    db.session.add(new_application)
    db.session.commit()

    if curr_user.role == 0: # student
        curr_project.practitioner_applications = func.array_append(curr_project.practitioner_applications, new_application.aid)
        
        # if is a group application
        if request.json['applicant_type'] == 1:
            
            curr_team = Team.query.filter_by(tid=request.json['applicant_id']).first()
            curr_team.aids = func.array_append(curr_team.aids, new_application.aid)

    else: # academic
        curr_project.academic_applications = func.array_append(curr_project.academic_applications, new_application.aid)

    db.session.commit()

    return application_sc.jsonify(new_application)


# withdraw application from a sepecific project
@app.route('/application/withdraw/<userid>/<applicationid>/', methods=['DELETE'])
def withdrawapplication(userid, applicationid):
    curr_application = Application.query.filter_by(aid=applicationid).first()
    curr_project = Project.query.filter_by(pid=curr_application.pid).first()
    applicationid = int(applicationid)

    if curr_application.applicant_type == 0:
        curr_project.practitioner_applications = func.array_remove(curr_project.practitioner_applications, applicationid)
    elif curr_application.applicant_type == 1:
        curr_team = Team.query.filter_by(tid=curr_application.applicant_id).first()
        curr_team.aids = func.array_remove(curr_team.aids, applicationid)

        curr_project.practitioner_applications = func.array_remove(curr_project.practitioner_applications, applicationid)
    else:
        curr_project.academic_applications = func.array_remove(curr_project.academic_applications, applicationid)
        
    Application.query.filter_by(aid=applicationid).delete(synchronize_session=False)

    db.session.commit()

    return jsonify('Withdrawed the application'), 200

# user can view all applications been made
@app.route('/project/application/myapplication/<userid>/', methods=['GET'])
def getmyapplication(userid):
    curr_user = User.query.filter_by(uid=userid).first()

    if curr_user.role == 0:
        my_team = Team.query.filter(Team.tid.in_(curr_user.tids)).all()
        my_team_aids =  [aid for team in my_team for aid in team.aids]
        unique_merged_aids = list(set(my_team_aids))
        
        return applications_sc.jsonify(Application.query.filter(or_(and_(Application.applicant_type==0, Application.applicant_id==int(userid)), and_(Application.applicant_type==1, Application.aid.in_(unique_merged_aids)))).all())
    else: # academic
        
        return applications_sc.jsonify(Application.query.filter(and_(Application.applicant_type==2, Application.applicant_id==userid)).all())
    

# users can examine details of an application of a project
@app.route('/project/application/search/<userid>/<applicationid>/', methods=['GET'])
def getapplication(userid, applicationid):
    return application_sc.jsonify(Application.query.filter_by(aid=applicationid).first())

# industry partner prioritize an application
@app.route('/project/application/save/<userid>/<applicationid>/', methods=['PUT'])
def prioritizepractitionerapplication(userid, applicationid):
    curr_application = Application.query.filter_by(aid=applicationid).first()
    curr_application.priority_level = curr_application.priority_level + 1
    db.session.commit()
    return application_sc.jsonify(curr_application)

@app.route('/project/application/unsave/<userid>/<applicationid>/', methods=['PUT'])
def unprioritizepractitionerapplication(userid, applicationid):
    curr_application = Application.query.filter_by(aid=applicationid).first()
    curr_application.priority_level = curr_application.priority_level - 1
    db.session.commit()
    return application_sc.jsonify(curr_application)

# industry partner can browse all applications of a project
@app.route('/project/application/browse/practitioner/<userid>/<projectid>/', methods=['GET'])
def getpractitionerapplication(userid, projectid):
    curr_project = Project.query.filter_by(pid=projectid).first()

    # sort section
    if request.json['priority_level_sort'] != 0:
        applications = Application.query.filter(Application.aid.in_(curr_project.practitioner_applications)).order_by(Application.priority_level.desc()).all()
    else:
        applications = Application.query.filter(Application.aid.in_(curr_project.practitioner_applications)).all()

    return applications_sc.jsonify(applications)

@app.route('/project/application/browse/academic/<userid>/<projectid>/', methods=['GET'])
def getacademicapplication(userid, projectid):
    curr_project = Project.query.filter_by(pid=projectid).first()       

    # sort section
    if request.json['priority_level_sort'] != 0:
        applications = Application.query.filter(Application.aid.in_(curr_project.academic_applications)).order_by(Application.priority_level.desc()).all()
    else:
        applications = Application.query.filter(Application.aid.in_(curr_project.academic_applications)).all()

    return applications_sc.jsonify(applications)

# industry partner can send an invitation/rejection to a student/student team and academic supervisor (from frontend i.e. click "Invite" button and system will send an email)
@app.route('/project/application/invite/<userid>/<applicationid>/', methods=['PUT'])
def inviteuser(userid, applicationid):
    # send email to user of the application 
    curr_application = Application.query.filter_by(aid=applicationid).first()
    curr_application.status = 3

    curr_project = Project.query.filter_by(pid=curr_application.pid).first()
    if curr_application.applicant_type < 2:
        curr_project.assigned_practitioner = -curr_application.applicant_id
    else:
        curr_project.assigned_academic = -curr_application.applicant_id

    db.session.commit()

    return application_sc.jsonify(curr_application)

# withdraw all individual applications
# leave all other teams
# withdraw all other team applications if they are no longer meet min_student_num requirement
def withdrawapplications(userid, project_teamid, applicationid):
    userid = int(userid)
    curr_user = User.query.filter_by(uid=userid).first()

    curr_user.status = 0
    
    individual_applications = Application.query.filter(and_(Application.applicant_type==0, Application.applicant_id==userid)).all()
    curr_individual_application_aids = [application.aid for application in individual_applications]



    for aid in curr_individual_application_aids:
        if aid == int(applicationid): continue
        withdrawapplication(userid, aid)
    
    # leave all current teams
    for tid in curr_user.tids:
        if tid == project_teamid: continue

        curr_team = Team.query.filter_by(tid=tid).first()
        if curr_team.uid == int(userid) and len(curr_team.members) > 0:
            # assign leader permission to a member
            curr_team.user = User.query.filter_by(uid=curr_team.members[0]).first()
            curr_team.members = func.array_remove(curr_team.members, curr_team.user.uid)
            curr_team.members = func.array_append(curr_team.members, userid)

        leaveteam(userid, tid)



# TODO notify rejected applicants
# TODO notify industry partner about the applicant decision


# Need to test application status first
# Student/Student team and academic supervisor can respond to an application invitation
# accept an application invitation: 
#   1: system will automatically withdraw all current applications from the team that members have join(if team fails to meet min_student_num)
#   2: system will automatically decline all other individual project invitations
#   3: if user is either a team leader of a team with only himself/herself OR not a team leader ====> system will automatically enforce user to leave these groups (if no user exists in these group after leaving ===> these groups will be dismissed)
#   4: if user is a team leader of the team and there are more than 1 members in the group ====> system will automatically assign the leader permission to user who join the team first then leave the group
#   5: system will automatically reject other student OR academic applications (depends on the current successful applicant role)
# decline an application invitation
@app.route('/project/application/respond/<userid>/<applicationid>/', methods=['PUT'])
def respondinvitation(userid, applicationid):
    if request.json['response'] == 0: # accept

        curr_application = Application.query.filter_by(aid=applicationid).first()
        curr_application.status = 5

        curr_project = Project.query.filter_by(pid=curr_application.pid).first()


        # student
        if curr_application.applicant_type < 2:
            curr_project.assigned_practitioner = -curr_project.assigned_practitioner

            # accepted project is a individual project
            if curr_application.applicant_type == 0: 
                withdrawapplications(curr_application.applicant_id, None, applicationid)

            ###########################
            # accept a group project #
            ###########################
            else:
                curr_team = Team.query.filter_by(tid=curr_application.applicant_id).first()

                # indicate current team is on work mode
                if curr_team.available_spots == 0:
                    curr_team.available_spots = -30
                else:
                    curr_team.available_spots = -curr_team.available_spots

                all_members_uids = curr_team.members
                all_members_uids.append(curr_team.uid)

                for member_uid in all_members_uids:
                    withdrawapplications(member_uid, curr_application.applicant_id, applicationid)
        #academic
        else:
            curr_project.assigned_academic = -curr_project.assigned_academic

            # reject other academic applicant
            temp_applications = curr_project.academic_applications
            temp_applications.remove(int(applicationid))
            rejected_applications = Application.query.filter(Application.aid.in_(temp_applications))
            db.session.query(Application).filter(Application.aid.in_([app.aid for app in rejected_applications])).update({Application.status: 4}, synchronize_session='fetch')

    else: # reject
        curr_application = Application.query.filter_by(aid=applicationid).first()
        curr_application.status = 6

        curr_project = Project.query.filter_by(pid=curr_application.pid).first()
        if curr_application.applicant_type < 2:
            curr_project.assigned_practitioner = None
        else:
            curr_project.assigned_academic = None


    db.session.commit()

    return application_sc.jsonify(curr_application)

if __name__ == '__main__':
    app.run(debug=True)
