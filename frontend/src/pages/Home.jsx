import "../index.css";
import React from "react";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <div
      className="container mulish-font"
      style={{ padding: "10px 30px", fontSize: "20px" }}
    >
      <div className="row">
        <h3 style={{ fontWeight: "bold", fontStyle: "italic", marginBottom:"15px" }}>
          Welcome to Lavender Lodge
        </h3>
        <div className="welcome-container col">
          <p>
            Whether you're planning a quick getaway or a long vacation, we're
            here to help you find the perfect stay. Explore our rooms, check
            availability, and make your booking with ease. Let us make your stay
            memorable!
          </p>
        </div>
        <div className="image-container col ">
          <img
            src="image/hotel.avif"
            alt="Hotel"
            className="hotel-image img-fluid w-100 rounded"
          />
        </div>
      </div>
      <Container>
        <h4 style={{ fontWeight: "bold", fontStyle: "italic" }}>Contact Us</h4>
        <p>
          Have questions or need more information? <br />
          Feel free to reach out to us! We're always here to assist you.
        </p>
        <div className="contact-info">
          <p>
            <strong>Phone:</strong> <a href="tel:+1234567890">+1 234 567 890</a>
          </p>
          <p>
            <strong>Email:</strong>
            <a href="mailto:info@hotelbooking.com">info@hotelbooking.com</a>
          </p>
          <p>
            <strong>Visit Us:</strong> 456 Hotel Avenue, Suite 101
          </p>
        </div>
      </Container>
    </div>
  );
}
