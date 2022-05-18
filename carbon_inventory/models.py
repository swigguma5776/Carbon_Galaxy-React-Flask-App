from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate   
import uuid  
from datetime import date, datetime 
from math import ceil 

# add security for passwords 
from werkzeug.security import generate_password_hash, check_password_hash

# import secrets module from python to get tokens
import secrets 

from flask_login import UserMixin

from flask_login import LoginManager 

from flask_marshmallow import Marshmallow


db = SQLAlchemy()
login_manager = LoginManager()
ma = Marshmallow() 

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

class User(db.Model, UserMixin):
    id = db.Column(db.String, primary_key = True)
    first_name = db.Column(db.String(150), nullable = False,)
    last_name = db.Column(db.String(150), nullable = False,)
    email = db.Column(db.String(150), nullable = False)
    password = db.Column(db.String, nullable = True, default = '')
    g_auth_verify = db.Column(db.Boolean, default = False)
    token = db.Column(db.String, default = '', unique = True)
    date_created = db.Column(db.DateTime, nullable = False, default = datetime.utcnow)
    carbon = db.relationship('Carbon', backref = 'owner', lazy = True)

    def __init__(self, first_name, last_name, email, id = '', password = '', token = '', g_auth_verify = False):
        self.id = self.set_id()
        self.first_name = first_name
        self.last_name = last_name
        self.password = self.set_password(password)
        self.email = email
        self.token = self.set_token(24)
        self.g_auth_verify = g_auth_verify

    def set_token(self, length):
        return secrets.token_hex(length)

    def set_id(self):
        return str(uuid.uuid4())

    def set_password(self, password):
        self.pw_hash = generate_password_hash(password)
        return self.pw_hash 

    def __repr__(self):
        return f"User {self.first_name} {self.last_name} has been added to the database"


class Carbon(db.Model):
    id = db.Column(db.String, primary_key = True)
    website_url = db.Column(db.String(150), nullable = False)
    carbon_per_webpage = db.Column(db.Numeric(precision=10, scale=2), nullable = False)
    carbon_per_year = db.Column(db.Numeric(precision=10, scale=2), nullable = False)
    green_energy = db.Column(db.Boolean, default = False)
    trees_needed = db.Column(db.Integer, nullable = False)
    user_token = db.Column(db.String, db.ForeignKey('user.token'), nullable = False)

    # Changed some args to be default strings 

    def __init__(self, website_url, carbon_per_webpage, green_energy, user_token, id = ''):
        self.id = self.set_id()
        self.website_url = website_url
        self.carbon_per_webpage = carbon_per_webpage
        self.carbon_per_year = self.carbon_year()
        self.green_energy = green_energy
        self.trees_needed = self.trees_calc()
        self.user_token = user_token 

    
    def carbon_year(self):
        self.carbon_per_year = float("{:.2f}".format(float(self.carbon_per_webpage) * 100000 * 12))
        print(self.carbon_per_year)


    def trees_calc(self):
        self.trees_needed = ceil(float("{:.2f}".format(float(self.carbon_per_webpage) * 100000 * 12)) / 20000)
        print(self.trees_needed)



    def __repr__(self):
        return f"The following carbon data has been added for url: {self.website_url}"

    def set_id(self):
        return (secrets.token_urlsafe())


# Create API Schema via Marshmallow Object
class CarbonSchema(ma.Schema):
    class Meta:
        fields = ['id', 'website_url', 'carbon_per_webpage', 'carbon_per_year', 'green_energy', 'trees_needed']


carbon_schema = CarbonSchema()
carbons_schema = CarbonSchema(many = True)
