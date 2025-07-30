import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm/ProductForm";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import EditProduct from "./components/EditProduct/EditProduct"; 

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/edit/:id" element={<EditProduct />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
