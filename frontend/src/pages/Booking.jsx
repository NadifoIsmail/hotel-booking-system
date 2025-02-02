import "../index.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Booking() {
  const [bookings, setBookings] = useState([]);

  // Function to fetch bookings
  const fetchBookings = () => {
    fetch("https://hotel-booking-system-xvqy.onrender.com/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.log("Error fetching bookings:", err));
  };

  // Fetch bookings when the page loads
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mt-4 mulish-font">
      <h1 className="text-center mb-4">Bookings List</h1>
      <div className="row">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="col-md-4">
              <div className="card shadow-lg mb-4">
                <div className="card-body">
                  <h5 className="card-title">Booking {booking.id}</h5>
                  <p className="card-text">
                    <strong>Username:</strong> {booking.user.name} <br />
                    <strong>Room Type:</strong> {booking.room.room_type} <br />
                    <strong>Check-in:</strong> {new Date(booking.start_date).toLocaleDateString()} <br />
                    <strong>Check-out:</strong> {new Date(booking.end_date).toLocaleDateString()} <br />
                  </p>
                  <Link to={`/bookings/${booking.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No bookings available.</p>
        )}
      </div>
    </div>
  );
}
