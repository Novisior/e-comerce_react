import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserAddToCart.css";

const UserAddToCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = "shubh001"; // ✅ Same userId used as above
        const res = await axios.get(`http://localhost:5000/api/cart?userId=${userId}`);
        setCartItems(res.data);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${cartItemId}`);
      setCartItems(cartItems.filter((item) => item._id !== cartItemId));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  if (cartItems.length === 0) {
    return <h2 className="empty-cart">Your cart is empty.</h2>;
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h3>{item.title}</h3>
              <p>₹{item.price}</p>
              <p>Qty: {item.quantity}</p>
              <button onClick={() => handleRemove(item._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAddToCart;
