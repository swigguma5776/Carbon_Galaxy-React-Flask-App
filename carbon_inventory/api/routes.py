from flask import Blueprint, request, jsonify 
from carbon_inventory.helpers import token_required
from carbon_inventory.models import db, User, Carbon, CarbonSchema, carbon_schema, carbons_schema

api = Blueprint('api', __name__, url_prefix = '/api')

@api.route('/getdata')
@token_required
def getdata(current_user_token):
    return {'some': 'value'}

# CREATE CARBON ENDPOINT
@api.route('/carbons', methods = ['POST'])
@token_required
def create_carbon(current_user_token):
    website_url = request.json['website_url']
    carbon_per_webpage = request.json['carbon_per_webpage']
    green_energy = request.json['green_energy']
    user_token = current_user_token.token 

    print(f"BIG TESTER: {current_user_token.token}")

    carbon = Carbon(website_url, carbon_per_webpage, green_energy, user_token = user_token)

    db.session.add(carbon)
    db.session.commit() 


    response = carbon_schema.dump(carbon)
    return jsonify(response)



# RETRIEVE ALL Carbon ENDPOINT
@api.route('/carbons', methods = ['GET'])
@token_required
def get_carbons(current_user_token):
    owner = current_user_token.token
    carbons = Carbon.query.filter_by(user_token = owner).all()
    response = carbons_schema.dump(carbons)
    return jsonify(response)


# RETRIEVE ONE Carbon ENDPOINT
@api.route('/carbons/<id>', methods = ['GET'])
@token_required
def get_carbon(current_user_token, id):
    owner = current_user_token.token
    if owner == current_user_token.token:
        carbon = Carbon.query.get(id)
        response = carbon_schema.dump(carbon)
        return jsonify(response)
    else:
        return jsonify({"message": "Valid Token Required"}),401


# # UPDATE CARBON ENDPOINT
@api.route('/carbons/<id>', methods = ['POST','PUT'])
@token_required
def update_carbon(current_user_token,id):
    carbon = Carbon.query.get(id) # grab carbon instance

    carbon.website_url = request.json['website_url']
    carbon.carbon_per_webpage = request.json['carbon_per_webpage']
    carbon.green_energy = request.json['green_energy']
    carbon.user_token = current_user_token.token 

    db.session.commit()
    response = carbon_schema.dump(carbon)
    return jsonify(response)


# # DELETE CARBON ENDPOINT
@api.route('/carbons/<id>', methods = ['DELETE'])
@token_required
def delete_carbon(current_user_token, id):
    carbon = Carbon.query.get(id)
    db.session.delete(carbon)
    db.session.commit()
    response = carbon_schema.dump(carbon)
    return jsonify(response)