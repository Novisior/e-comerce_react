import React from "react";
import "../Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();

  // Replace with real auth check logic
  const isLoggedIn = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="left">
        <img
          src="https://www.shutterstock.com/image-vector/cricket-club-player-logo-vector-600nw-2417731251.jpg"
          alt="Logo"
          className="logo"
        />
        <h2>CRICKET SHOPYYYYY!!!!!</h2>
      </div>

      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="right">
        <Link to="/" className="home-btn">Home</Link>
        <Link to="/cart" title="Cart">
          <i className="ri-shopping-cart-line"></i>
        </Link>

        {isLoggedIn ? (
          <>
            <span>Hi, {username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" title="Login">
              <i className="ri-user-line"></i>
            </Link>
            <Link to="/register" title="Register">
              <i className="ri-user-add-line"></i>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
