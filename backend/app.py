from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import jwt


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



class UserInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.Integer)
    email = db.Column(db.Text())
    password = db.Column(db.String(50))
    Passport = db.Column(db.String(100))
    DriverLicense = db.Column(db.String(100))
    MedicalCard =  db.Column(db.String(100))
    name = db.Column(db.String(50))

    def __init__(self, role, email, password):
        self.role = role
        self.email = email
        self.password = password
        
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'role','email','password')


article_schema1 = ArticleSchema()
article_schema2 = ArticleSchema(many= True)

user_sc = UserSchema()
users_sc = UserSchema(many=True)

#create table
with app.app_context():
    db.create_all()

#test function
@app.route('/get', methods=['GET'])
def get_articles():
    all_articles = article_test.query.all()
    print(type(all_articles))
    results = article_schema2.dump(all_articles)


    return jsonify(results)
#test function
@app.route('/add', methods=['POST'])
def add_article():
    title = request.json['title']
    body = request.json['body']
    
    articles = article_test(title, body)
    db.session.add(articles)
    db.session.commit()
    return article_schema1.jsonify(articles)
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
    
    user = UserInfo(role,email,password)
    db.session.add(user)
    db.session.commit()
    return user_sc.jsonify(user)

#sign in function for system
@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    token = jwt.encode({'user_id': '1'}, app.config['SECRET_KEY'], algorithm='HS256')
    
    user = UserInfo.query.filter_by(email=email, password=password).first()
    user_data = user_sc.dump(user)
    usersend = {'token': str(token), 'user': user_data}
    

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
