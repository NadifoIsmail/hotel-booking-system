// import "./App.css";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Room from "./pages/Room";
import Profile from "./pages/Profile";
import BookingInfoPage from "./pages/BookingInfoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookings/:id" element={<BookingInfoPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/room" element={<Room />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
