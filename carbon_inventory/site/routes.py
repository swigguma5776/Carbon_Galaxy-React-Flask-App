from flask import Blueprint, render_template, request, redirect, url_for, flash #added request, redirect, url_for, & flash
from flask_login.utils import login_required

from carbon_inventory.models import User, db, Carbon #added db & User
from flask_login import current_user
# from carbon_inventory.forms import CarbonForm # added UserArtistForm

"""
Note that in code below,
Some arguments are specified when creating Blueprint object
First argument, "site", is Blueprint's name which is used by flask routing mechanism
Second argument, __name__, is Blueprint's import name which flask using to locate Blueprint's resources
"""


site = Blueprint('site', __name__, template_folder='site_templates')

@site.route('/')
def home():
    return render_template('index.html')

@site.route('/profile')
@login_required
def profile():
    carbons = Carbon.query.filter_by(user_token = current_user.token).all()
    return render_template('profile.html', carbons=carbons)