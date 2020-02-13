
from app import db
from datetime import date


class User(db.Model):
    __tablename__ = 'users'

    address_city = db.Column(db.String(200))
    address_country = db.Column(db.String())
    address_line_1 = db.Column(db.String(64))
    address_line_2 = db.Column(db.String(64))
    address_state = db.Column(db.String(20))
    address_zip_code = db.Column(db.Integer)
    birthday = db.Column(db.Date)
    deactivated = db.Column(db.Boolean, default=False)
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    post_card_received = db.Column(db.Integer, default=0)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    def __init__(self, address_city, address_country, address_line_1, address_line_2, address_state, address_zip_code, name, birthday):
        self.address_city = address_city
        self.address_country = address_country
        self.address_line_1 = address_line_1
        self.address_line_2 = address_line_2
        self.address_state = address_state
        self.address_zip_code = address_zip_code
        self.birthday = birthday
        self.created_at = date.today()
        self.updated_at = date.today()
        self.name = name

    def __repr__(self):
        return '<id {} - {}>'.format(self.id, self.name)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'birthday': self.birthday,
            'deactivated': self.deactivated,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'address_city': self.address_city,
            'country': self.address_country,
            'address': '{}{}'.format(self.address_line_1, "_" if self.address_line_2 is None else '_' + self.address_line_2),
            'post_card_received': self.post_card_received,
            'state': self.address_state,
            'zipcode': self.address_zip_code
        }


class PostCard(db.Model):
    __tablename__ = 'post_cards'

    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.Date)
    expected_delivery_date = db.Column(db.Date)
    post_card_id = db.Column(db.String(256))
    receiver_id = db.Column(db.Integer)
    send_date = db.Column(db.Date)
    url = db.Column(db.String(256))

    def __init__(self, date_created, expected_delivery_date, post_card_id, receiver_id, send_date, url):
        self.date_created = date_created
        self.expected_delivery_date = expected_delivery_date
        self.post_card_id = post_card_id
        self.receiver_id = receiver_id
        self.send_date = send_date
        self.created_at = date.today()

        def __repr__(self):
            return '<post card id {}>'.format(self.post_card_id)

        def serialize(self):
            return {
                'id': self.id,
                'date_created': self.date_created,
                'expected_delivery_date': self.expected_delivery_date,
                'post_card_id': self.post_card_id,
                'receiver_id': self.receiver_id,
                'send_date': self.send_date,
                'url': self.url
            }
