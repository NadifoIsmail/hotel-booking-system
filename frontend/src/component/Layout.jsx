import React from "react";
import "../index.css";
import { Outlet } from 'react-router-dom'
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="main" style={{backgroundImage:"linear-gradient(to top,rgb(145, 184, 247), #ffffff)" , minHeight:"90vh"}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
