import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams(); // product ID from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          category: res.data.category,
          price: res.data.price,
          image: null,
        });
        setImagePreview(res.data.image);
      })
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    updatedFormData.append('title', formData.title);
    updatedFormData.append('description', formData.description);
    updatedFormData.append('category', formData.category);
    updatedFormData.append('price', formData.price);
    if (formData.image) {
      updatedFormData.append('image', formData.image);
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`, updatedFormData);
      navigate(`/product/${id}`);
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product. Please try again.');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <nav>
        <button className="nav-link" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </nav>

      <div className="form-container">
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload New Image (optional):</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            {imagePreview && (
              <>
                <p>Current Image:</p>
                <img src={imagePreview} width="200" alt="Preview" />
              </>
            )}
          </div>

          <div className="form-group">
            <button type="submit">Update Product</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
