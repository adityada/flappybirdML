from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, support_credentials=True)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'crud.sqlite')
db = SQLAlchemy(app)
ma = Marshmallow(app)

class FinalData(db.Model):
    __tablename__ = "FinalData"
    id = db.Column(db.Integer, primary_key=True)
    birdYPos = db.Column(db.Integer, nullable=False)
    targetPos = db.relationship('TargetPos', backref='data', lazy=True)
    jump = db.Column(db.Boolean, unique=False)

    def __repr__(self):
        return f'<b'+str(self.id)+' y='+str(self.birdYPos)+'>'
    
class TargetPos(db.Model):
    __tablename__ = "TargetPos"
    id = db.Column(db.Integer, primary_key=True)
    xCor = db.Column(db.Integer, nullable=False, unique=False)
    yCor = db.Column(db.Integer, nullable=False, unique=False)
    data_id = db.Column(db.Integer, db.ForeignKey('FinalData.id'), nullable=False)

    def __repr__(self):
        return f'<x: '+str(self.xCor)+' y:'+str(self.yCor)+'>'

class FinalDataSchema(ma.ModelSchema):
    class Meta:
        model = FinalData
    targetPos = ma.List(ma.HyperlinkRelated('get_target_data'))

class TargetPosSchema(ma.Schema):
    class Meta:
        fields = ('xCor', 'yCor', 'data_id')

final_data_schema = FinalDataSchema()
final_datas_schema = FinalDataSchema(many=True)
targetpos_schema = TargetPosSchema()
targetposes_schema = TargetPosSchema(many=True)

# Endpoint to post target positions 
@app.route("/target", methods=["POST"])
def add_target():
    xCor = request.json['xCor']
    yCor = request.json['yCor']
    data_id = request.json['data_id']

    new_target = TargetPos(xCor=xCor, yCor=yCor, data_id=data_id)
    result = jsonify(targetpos_schema.dump(new_target))
    result.headers.add('Access-Control-Allow-Origin', '*')

    db.session.add(new_target)
    db.session.commit()

    return result

# Endpoint to GET and SHOW target positions
@app.route("/target", methods=["GET"])
def get_target():
    targets = TargetPos.query.all()
    result = targetposes_schema.dump(targets)
    return jsonify(result.data)

# Endpoint to get target detail by id
@app.route("/target/<id>", methods=["GET"])
def get_target_id(id):
    target = TargetPos.query.get(id)
    result = targetpos_schema.dump(target)
    return targetpos_schema.jsonify(result)

# Endpoint to get targets by data_id
@app.route("/target/<id>", methods=["GET"])
def get_target_data(id):
    target = TargetPos.query.filter_by(data_id=id)
    result = targetposes_schema.dump(target)
    return jsonify(result)

# Endpoint to delete target by id
@app.route("/target/<id>", methods=["DELETE"])
def delete_target(id):
    target = TargetPos.query.get(id)
    result = targetpos_schema.dump(target)
    db.session.delete(target)
    db.session.commit()

    return targetpos_schema.jsonify(result)

# Endpoint to post Final Data
@app.route("/data", methods=["POST"])
def post_data():
    birdYPos = request.json['birdYPos']
    jump = request.json['jump']

    new_data = FinalData(birdYPos=(birdYPos), jump=jump)
    result = jsonify(final_data_schema.dump(new_data))
    result.headers.add('Access-Control-Allow-Origin', '*')
    db.session.add(new_data)
    db.session.commit()

    return result

@app.route("/data", methods=["GET"])
def get_data():
    alldata = FinalData.query.all()
    result = final_datas_schema.dump(alldata)
    return jsonify(result.data)

@app.route("/data/<id>", methods=["GET"])
def get_data_id(id):
    data = FinalData.query.get(id)
    result = final_data_schema.dump(data)
    return jsonify(result)

@app.route("/data/<id>", methods=["DELETE"])
def delete_data_id(id):
    data = FinalData.query.get(id)
    db.session.delete(data)
    db.session.commit()

    return final_data_schema.jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)