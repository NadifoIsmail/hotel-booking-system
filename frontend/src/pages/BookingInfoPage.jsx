import "../index.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify';

export default function BookingInfoPage() {
  const { id } = useParams();
  const [roomType, setRoomType] = useState("");
  const [startDate , setStartDate] = useState("");
  const [endDate , setEndDate] = useState("");
  const [booking, setBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://hotel-booking-system-xvqy.onrender.com/bookings/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch booking");
        return res.json();
      })
      .then((data) => {
        setBooking(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (booking){
      setRoomType(booking.room.room_type)
      setStartDate(booking.start_date)
      setEndDate(booking.end_date)
    }
  },[booking]);

  
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://hotel-booking-system-xvqy.onrender.com/bookings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete booking");
      }
      toast.success("Booking deleted successfully");
      navigate("/"); // Redirect to home or bookings list
      
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("Error deleting booking. Please try again.");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`https://hotel-booking-system-xvqy.onrender.com/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({roomType,startDate,endDate}),
      });

      if (!res.ok) throw new Error("Failed to update booking");

      const updatedData = await res.json();
      setBooking(updatedData);
      setShowModal(false);
    } catch (err) {
      console.error("Error updating booking:", err);
      setError("Error updating booking. Please try again.");
    }
  };

  if (loading) return <p>Loading booking details...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!booking) return <p className="text-warning">No booking found.</p>;

  return (
    <div className="container mt-4 mulish-font">
      <h1 className="text-center mb-4">Booking Details</h1>
      <div className="card shadow-lg mb-4">
        <div className="card-body">
          <h5 className="card-title">Booking {booking.id}</h5>
          <p><strong>Check-in:</strong> {new Date(booking.start_date).toLocaleDateString()}</p>
          <p><strong>Check-out:</strong> {new Date(booking.end_date).toLocaleDateString()}</p>
          <p><strong>Username:</strong> {booking.user.name}</p>
          <p><strong>Room type:</strong> {booking.room.room_type}</p>
          <button onClick={handleDelete(booking.id)} className="btn btn-danger me-2">Delete Booking</button>
          <button onClick={() => setShowModal(true)} className="btn btn-warning">Update Booking</button>
        </div>
      </div>

      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }} onClick={() => setShowModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Booking</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => { e.preventDefault(); handleUpdate(booking.id); }}>
                  <div className="mb-3">
                    <label className="form-label">Room Type</label>
                    <input
                      type="text"
                      className="form-control"
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-success">Update Booking</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
