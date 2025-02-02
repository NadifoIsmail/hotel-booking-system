import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div
        className="container-fluid mulish-font"
        style={{ backgroundColor: "#ffffff", height: "45px", fontSize: "18px" }}
      >
        <h3
          className="navbar-brand"
          style={{ fontStyle: "italic", fontWeight: "bold" }}
        >
          Lavender Lodge
        </h3>
        <div className="nav justify-content-end">
          <Link className="nav-link active " aria-current="page" to="/">
            Home
          </Link>
          <Link className="nav-link " to="/room">
            Room
          </Link>
          <NavDropdown title="Admin Dashboard " id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link className="nav-link" to="/booking">
                Booking
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </nav>
  );
}
