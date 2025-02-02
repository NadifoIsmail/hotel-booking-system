import "../index.css";
import React, { useState } from "react";
import BookingForm from "./BookingForm";  

export default function RoomCard({ room }) {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookingSuccess = (bookingData) => {
    console.log("Booking successful", bookingData);
    setShowBookingForm(false);  
  };

  return (
    <div className="col-md-4 mb-4 mulish-font">
      <div className="card shadow-lg">
        <img src={room.image_url} alt={room.room_type} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{room.room_type}</h5>
          <p className="card-text">
            <strong>Room Number:</strong> {room.room_number}
            <br />
            <strong>Price:</strong> {room.price}
          </p>

          {showBookingForm ? (
            <BookingForm room={room} onBookingSuccess={handleBookingSuccess} />
          ) : (
            <button className="btn btn-primary" onClick={() => setShowBookingForm(true)}>
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
