import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

app.config.from_object(os.getenv('APP_SETTINGS'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


@app.route("/")
def hello():
    return "Hello World!"


from models import User
@app.route("/add")
def add_user():
    name = request.args.get('name')
    birthday = request.args.get('birthday')
    address_city = request.args.get('address_city')
    address_country = request.args.get('address_country')
    address_line_1 = request.args.get('address_line_1')
    address_line_2 = request.args.get('address_line_2')
    address_state = request.args.get('address_state')
    address_zip_code = request.args.get('address_zip_code')

    try:
        user = User(
            name=name,
            birthday=birthday,
            address_city=address_city,
            address_country=address_country,
            address_line_1=address_line_1,
            address_line_2=address_line_2,
            address_state=address_state,
            address_zip_code=address_zip_code
        )
        db.session.add(user)
        db.session.commit()
        return "User added. user id={}".format(user.id)
    except Exception as e:
        return(str(e))


@app.route("/getall")
def get_all():
    try:
        users = User.query.all()
        return jsonify([user.serialize() for user in users])
    except Exception as e:
        return(str(e))


@app.route("/get/<id_>")
def get_by_id(id_):
    try:
        user = User.query.filter_by(id=id_).first()
        return jsonify(user.serialize())
    except Exception as e:
        return(str(e))


if __name__ == '__main__':
    app.run()
