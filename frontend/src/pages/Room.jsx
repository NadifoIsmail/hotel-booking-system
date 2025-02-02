import "../index.css";
import React, { useState, useEffect } from "react";
import RoomCard from "../component//RoomCard";  

export default function Room() {
  const [rooms, setRooms] = useState([]);

  
  useEffect(() => {
    fetch("https://hotel-booking-system-xvqy.onrender.com/rooms")  
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  return (
    <div className="container mt-4 mulish-font">
      <h1 className="text-center mb-4">Type of Rooms</h1>
      <div className="row">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
