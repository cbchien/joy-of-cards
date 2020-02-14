import os
from flask import Flask, request, jsonify
from sqlalchemy.sql import func
from flask_sqlalchemy import SQLAlchemy
import lob
from dotenv import load_dotenv

load_dotenv()
lob.api_key = os.getenv('LOB_API_KEY')
app = Flask(__name__)

app.config.from_object(os.getenv('APP_SETTINGS'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


@app.route("/")
def hello():
    return "Hello World!"

from lobUtils import LobUltilities
from models import User, PostCard

@app.route("/api/users", methods=['GET'])
def get_all_users():
    try:
        users = User.query.all()
        return jsonify([user.serialize() for user in users])
    except Exception as e:
        return(str(e))


@app.route("/api/users", methods=['POST'])
def add_user():
    name = request.args.get('name')
    birthday_day = request.args.get('birthday_day')
    birthday_month = request.args.get('birthday_month')
    birthday_year = request.args.get('birthday_year')
    address_city = request.args.get('address_city')
    address_country = request.args.get('address_country')
    address_line_1 = request.args.get('address_line_1')
    address_line_2 = request.args.get('address_line_2')
    address_state = request.args.get('address_state')
    address_zip_code = request.args.get('address_zip_code')

    try:
        user = User(
            name=name,
            birthday_day=birthday_day,
            birthday_month=birthday_month,
            birthday_year=birthday_year,
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


@app.route("/api/users/<userId>", methods=['GET'])
def get_user_by(userId):
    try:
        user = User.query.filter_by(id=userId).first()
        return jsonify(user.serialize())
    except Exception as e:
        return(str(e))


@app.route("/api/users/<userId>", methods=['PUT'])
def update_user_by(userId):
    user = User.query.filter_by(id=userId).first()
    fields = ['name', 'birthday', 'address_city', 'address_country',
              'address_line_1', 'address_line_2', 'address_state', 'address_zip_code']

    try:
        for field in fields:
            if request.args.get(field) is not None:
                setattr(user, field, request.args.get(field))
        db.session.commit()
        return "User updated. user id={} {}".format(user.id, user.name)
    except Exception as e:
        return(str(e))


@app.route("/api/post-card", methods=['POST'])
def send_post_card():
    try:
        LobUtil = LobUltilities()
        userId = request.args.get('receiver')
        user = User.query.filter_by(id=userId).first()
        LobUtil.send_post_card_to(user.id)
        return 'Post card sent to {}'.format(user.id)
    except Exception as e:
        return(str(e))


@app.route("/api/post-card/<postCardId>", methods=['GET'])
def get_post_card_by(postCardId):
    try:
        post_card = PostCard.query.filter_by(id=postCardId).first()
        return jsonify(post_card.serialize())
    except Exception as e:
        return(str(e))

@app.route("/api/post-card/count", methods=['GET'])
def get_total_sent_count():
    try:
        total_count = 0
        query = db.session.query(func.sum(User.post_card_received).label("total_sent"))
        if query.scalar() is not None:
            total_count = query.scalar()
        return jsonify({'total': total_count})
    except Exception as e:
        return(str(e))

from cron import scheduler

if __name__ == '__main__':
    app.run()
