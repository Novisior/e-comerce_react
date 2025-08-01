import React, { useState } from "react";
import axios from "axios";
import "./ProductForm.css";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("price", price);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/products/add`, formData);
      console.log("✅ Product added:", res.data);
      alert("Product added successfully!");
      // Reset form if needed
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      setCategory("");
      setPrice("");
    } catch (err) {
      console.error("❌ Error uploading product:", err);
      alert("Error adding product");
    }
  };

  return (
    <div className="form-container">
      <h1>ADD NEW PLAYER</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="img">Image</label>
        <input
          type="file"
          id="img"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Image Preview"
            style={{ width: "100px", height: "auto", borderRadius: "5px", marginTop: "10px" }}
          />
        )}

        <label htmlFor="desc">Description</label>
        <input
          type="text"
          id="desc"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="cat">Category</label>
        <input
          type="text"
          id="cat"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button type="submit">Add Player</button>
      </form>
    </div>
  );
};

export default ProductForm;