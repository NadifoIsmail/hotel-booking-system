from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()

class User(db.Model,SerializerMixin):
    __tablename__='users'

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(100), nullable=False)

    bookings = db.relationship('Booking',back_populates='user',cascade ='all,delete-orphan')

    serialize_rules = ("-bookings",)

    @validates('name')
    def validate_name(self, key, name):
        if not name.strip():
            raise ValueError('Name can not be empty')
        return name
    
    @validates('email')
    def validate_email(self, key, email): 
        if not email.strip():
            raise ValueError('Email can not be empty')
        if '@' not in email:
            raise ValueError('Email is invalid')
        return email


    def __repr__(self):
        return f'<User {self.id}>'


class Room(db.Model,SerializerMixin):
    __tablename__='rooms'

    id = db.Column(db.Integer,primary_key=True)
    room_type = db.Column(db.String(100),nullable=False)
    room_number= db.Column(db.Integer,nullable=False)
    price = db.Column(db.Float,nullable=False)
    image_url = db.Column(db.String(255), nullable=True) 

    bookings = db.relationship('Booking',back_populates='room',cascade ='all,delete-orphan')

    serialize_rules = ("-bookings",)

    @validates('price')
    def validates(self,key,price):
        if not (1000 <= price <= 6000):
            raise ValueError("Price must be between 1000 and 6000")
        return price


    def __repr__(self):
        return f'<Room {self.id}>'
    

class Booking(db.Model,SerializerMixin):
    __tablename__ = 'bookings'


    id = db.Column(db.Integer,primary_key=True)
    start_date = db.Column(db.Date,nullable=False)
    end_date = db.Column(db.Date,nullable=False)

    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    room_id = db.Column(db.Integer,db.ForeignKey('rooms.id'),nullable=False)

    user = db.relationship('User',back_populates='bookings')
    room = db.relationship('Room',back_populates='bookings')

    serialize_rules = ("-user.bookings","-room.bookings")

    

    def __repr__(self):
        return f'<Booking {self.id}>'


