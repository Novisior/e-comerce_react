import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <div className="navbar">
      <div className="left">
        <img
          src="https://www.shutterstock.com/image-vector/cricket-club-player-logo-vector-600nw-2417731251.jpg"
          alt="Logo"
          className="logo"
        />
        <h2>CRICKET SHOPYYYYY!!!!! - ADMIN</h2>
      </div>

      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="right">
        <Link to="/" className="home-btn">Home</Link>

        <Link to="/product" title="Add Product">
          <i className="ri-add-line" style={{ fontSize: "24px" }}></i>
        </Link>

        <div className="user-section">
          <span>Welcome, {user?.name || user?.email}</span>
          <button onClick={onLogout} className="logout-btn">
            <i className="ri-logout-box-line"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;