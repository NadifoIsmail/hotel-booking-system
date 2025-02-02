from flask import Flask,make_response,request
from flask_sqlalchemy import SQLAlchemy
from models import db,User,Booking,Room
from flask_migrate import Migrate
from flask_restful import Api,Resource
from flask_cors import CORS
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hoteldb_p5cn_user:Od5JbzHlOXczeDd3nGcN3OXUV8UGyQMp@dpg-cuft29ij1k6c73fuf2eg-a.oregon-postgres.render.com/hoteldb_p5cn'

db.init_app(app)
migrate = Migrate(app,db)

api = Api(app)
CORS(app)

class Home(Resource):
    def get(self):
        return {'message':'Welcome to Hotel Booking System'}
    
api.add_resource(Home,'/')

#Bookings
class BookingResource(Resource):
    def get(self):
        return make_response ([booking.to_dict() for booking in Booking.query.all()], 200)
    
    def post(self):
        data = request.get_json()

        name = data.get('name')
        email = data.get('email')
        start_date_str = data.get('start_date')
        end_date_str = data.get('end_date')
        room_id = data.get('room_id')

        user = User.query.filter_by(name=name , email=email).first()
        
        if not all([name, email, start_date_str, end_date_str]):
            return make_response({"errors": ["Missing required fields"]}, 400)

        try:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
        except ValueError:
            return make_response({"errors": ["Invalid date format. Use YYYY-MM-DD."]}, 400)

        room = db.session.get(Room, room_id)

        if not user or not room:
            return make_response({"errors": ["Invalid user_id or room_id"]}, 400)

        new_booking = Booking(
            user_id=user.id,
            room_id=room_id,
            start_date=start_date,
            end_date=end_date
        )

        db.session.add(new_booking)
        db.session.commit()

        return make_response(new_booking.to_dict(), 201)
    
api.add_resource(BookingResource,'/bookings')

class Booking_by_id(Resource):
    def get(self,id):
        booking = db.session.get(Booking, id)
        if booking:
            return make_response(booking.to_dict(), 200)
        return make_response({'error':'Booking not found'}, 404)
    
    def patch(self, id):
        booking = db.session.get(Booking, id)
        if booking:
            data = request.get_json()

            if 'startDate' in data:
                booking.start_date = datetime.strptime(data['startDate'], '%Y-%m-%d').date()
            if 'endDate' in data:
                booking.end_date = datetime.strptime(data['endDate'], '%Y-%m-%d').date()

            if 'roomType' in data:
                room = Room.query.filter_by(room_type = data.get("roomType")).first()
                if not room:
                    return make_response({"errors": ["Invalid roomType"]}, 400)
                booking.room_id = room.id

            db.session.commit()

            return make_response(booking.to_dict(), 200)
        
        return make_response({'error': 'Booking not found'}, 404)
            
    def delete(self,id):
        booking = db.session.get(Booking,id)
        if booking:
            db.session.delete(booking)
            db.session.commit()
            return make_response({'message':'Booking deleted successfully'}, 200)
        
        return make_response({'error': 'Booking not found'}, 404)
        
api.add_resource(Booking_by_id,'/bookings/<int:id>')

#Users
class UserResource(Resource):
    def get(self):
        return make_response([user.to_dict() for user in User.query.all()],200)
    
    def post(self):
        data = request.get_json()

        name = data.get('name')
        email =data.get('email')

        new_user = User(name=name,email=email)
        db.session.add(new_user)
        db.session.commit()

        
        return make_response(new_user.to_dict(),201)
    
api.add_resource(UserResource,'/users')

#Rooms 
class RoomResource(Resource):
    def get(self):
        return make_response([room.to_dict() for room in Room.query.all()],200)
    
    def post(self):
    
        data = request.get_json()

        room_type = data.get('room_type')
        room_number = data.get('room_number')
        price = data.get('price')
        image_url = data.get('image_url')

        new_room = Room(room_type=room_type,room_number=room_number,price=price,image_url=image_url)

        db.session.add(new_room)
        db.session.commit()


        return make_response(new_room.to_dict(),201)
    
api.add_resource(RoomResource,'/rooms')

if __name__ == '__main__':
    app.run(debug=True)