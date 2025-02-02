import "../index.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";


export default function BookingForm({ room, onBookingSuccess }) {
  const [isBooked, setIsBooked] = useState(false);  

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      check_in_date: "",
      check_out_date: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      check_in_date: Yup.date().required("Check-in date is required"),
      check_out_date: Yup.date().required("Check-out date is required"),
    }),
    onSubmit: (values) => {
      fetch("http://127.0.0.1:5000/bookings", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: values.name,
            email: values.email,
            room_id: room.id,
            start_date: values.check_in_date,
            end_date: values.check_out_date,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsBooked(true);
          onBookingSuccess(data);  
        })
        .catch((err) => console.error("Error booking room:", err));
    },
  });

  if (isBooked) {
    return <div className="alert alert-success">Room booked successfully!</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3>Book {room.room_type} - Room {room.room_number}</h3>

      <div className="mb-3 mulish-font">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-danger">{formik.errors.name}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-danger">{formik.errors.email}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="check_in_date" className="form-label">Check-in Date</label>
        <input
          type="date"
          id="check_in_date"
          name="check_in_date"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.check_in_date}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="check_out_date" className="form-label">Check-out Date</label>
        <input
          type="date"
          id="check_out_date"
          name="check_out_date"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.check_out_date}
        />
      </div>

      <button type="submit" className="btn btn-primary">Book Room</button>
    </form>
  );
}
