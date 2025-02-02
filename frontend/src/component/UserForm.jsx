import "../index.css";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {toast} from 'react-toastify';

export default function UserForm({ onUserAdded }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((newUser) => {
          onUserAdded(newUser); // Pass the new user to the parent
          resetForm(); // Clear the form
          toast.success("User added successfully");
        })
        .catch((err) => console.error("Error adding user:", err));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mb-4 mulish-font">
      <h3>Add User</h3>
      <div className="mb-3">
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

      <button type="submit" className="btn btn-primary">Add User</button>
    </form>
  );
}
