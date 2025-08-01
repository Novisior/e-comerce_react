import React, { useState, useEffect } from "react";
import "./App.css";

// Admin Components
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm/ProductForm";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import EditProduct from "./components/EditProduct/EditProduct";

// User Components
import UserNavbar from "./components/userPage/UserNavBar";
import UserHome from "./components/userPage/UserHome";
import UserProductDetails from "./components/userPage/UserProductDetails";
import UserAddToCart from "./components/userPage/UserAddToCart";

// Shared Components
import Login from "./components/Login/Login";

import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      try {
        // For Vercel deployment, use sessionStorage instead of localStorage
        // or implement a fallback system
        const savedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');

        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Clear both storage types on error
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    // Store in both for better compatibility
    try {
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    // Clear both storage types
    try {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // If user is not logged in, show login page
  if (!user) {
    return (
      <div>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    );
  }

  // Admin Interface
  if (user.role === 'admin') {
    return (
      <div>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductForm />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    );
  }

  // User Interface (default)
  return (
    <div>
      <UserNavbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/product/:id" element={<UserProductDetails />} />
        <Route path="/cart" element={<UserAddToCart />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;