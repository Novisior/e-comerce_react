import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Home/Home.css"; // reuse existing styles

const UserHome = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to Cricket Shopyyyy (User View)</h1>
      <p>Browse and view awesome cricket products!</p><br /><br />

      <div className="product-list">
        {products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="product-card"
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
