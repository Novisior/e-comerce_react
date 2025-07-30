import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../ProductDetails/ProductDetails.css";

const UserProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const userId = "shubh001"; // 🔁 Hardcoded for now
      await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        productId: product._id,
      });
      alert("Product added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  const handleBuyNow = () => {
    alert("Buy Now clicked. Implement checkout logic here.");
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div>
      <nav>
        <button className="nav-link" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </nav>

      <div className="product-detail">
        <div className="image-section">
          {product.image ? (
            <img src={product.image} alt={product.title} />
          ) : (
            <p>No image available</p>
          )}
        </div>

        <div className="info-section">
          <h1>{product.title}</h1>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>

          <div className="actions">
            <button className="add-btn" onClick={handleAddToCart}>Add to Cart</button>
            <button className="buy-btn" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProductDetails;
