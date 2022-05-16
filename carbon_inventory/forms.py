from flask_wtf import FlaskForm 
from wtforms import StringField, PasswordField, SubmitField, BooleanField, FloatField
from wtforms.validators import DataRequired, Email
from carbon_inventory.models import db 

class UserLoginForm(FlaskForm):
    first_name = StringField('First Name', validators = [DataRequired()])
    last_name = StringField('Last Name', validators = [DataRequired()])
    email = StringField('Email', validators = [DataRequired(), Email()])
    password = PasswordField('Password', validators = [DataRequired()])
    submit_button = SubmitField()


# Creating User Carbon Form (don't think I need this)

# class UserArtistForm(FlaskForm):
#     website_url = StringField('Website Url', validators = [DataRequired()])
#     carbon_per_webpage = StringField('Webpage Carbon Emissions', validators = [DataRequired()]) 
#     carbon_per_year = StringField('Yearly Carbon Emissions', validators = [DataRequired()])
#     green_energy = BooleanField('Using Green Energy', validators = [DataRequired()]) #This boolean field may not work!
#     trees_needed = StringField('Trees Needed to offset', validators = [DataRequired()])
   