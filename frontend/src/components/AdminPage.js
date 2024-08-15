import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css'; 

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    }
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/products/${currentProductId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Product updated');
        setEditMode(false);
        setCurrentProductId(null);
      } else {
        await axios.post('http://localhost:5000/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Product added');
      }
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setProduct({
        name: '',
        description: '',
        price: '',
        image: null
      });
    } catch (error) {
      console.error('Failed to save product', error);
      alert('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setProduct(product);
    setEditMode(true);
    setCurrentProductId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert('Product deleted');
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Panel</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Description:
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Image:
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <button type="submit" className="submit-button">
          {editMode ? 'Update Product' : 'Add Product'}
        </button>
      </form>
      <h2 className="product-list-title">Product List</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product._id} className="product-item">
            <div className="product-image-container">
              {product.image && (
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              )}
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            <button
              className="edit-button"
              onClick={() => handleEdit(product)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
